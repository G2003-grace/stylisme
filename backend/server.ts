import express, { type RequestHandler } from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "./db";

const app = express();

// CORS : en prod, on n'autorise que les origines listées dans CORS_ORIGINS
// (ex: "https://stylisme.vercel.app,https://samstyle.com").
// En dev (variable absente), on laisse tout passer.
const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length === 0 ? true : allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// ============================================================
// AUTHENTIFICATION ADMIN
// ============================================================

// Tokens valides en mémoire (perdus au redémarrage = re-login requis)
const validTokens = new Set<string>();

// Middleware : refuse l'accès si pas de token valide
const requireAdmin: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || !validTokens.has(token)) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }
  next();
};

// LOGIN : valide le mot de passe, renvoie un token
app.post("/admin/login", (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Mot de passe incorrect" });
    return;
  }
  const token = randomUUID();
  validTokens.add(token);
  res.json({ token });
});

// LOGOUT : invalide le token
app.post("/admin/logout", requireAdmin, (req, res) => {
  const token = req.headers.authorization!.slice(7);
  validTokens.delete(token);
  res.json({ success: true });
});


app.get("/", (_req, res) => {
  res.send("API fonctionne ✅");
});


app.get("/orders", requireAdmin, async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT
       cmd.idcommande,
       cmd.idclient,
       CONCAT(c.prenom, ' ', c.nom) AS client_nom,
       c.email AS client_email,
       cmd.modele,
       cmd.tissu,
       cmd.prix,
       cmd.statut,
       cmd.mesures,
       cmd.date_commande,
       cmd.date_livraison
     FROM commandes cmd
     JOIN clients c ON cmd.idclient = c.idclient
     ORDER BY cmd.date_commande DESC`
  );
  res.json(rows);
});


app.get("/clients", requireAdmin, async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT
       c.idclient,
       c.nom,
       c.prenom,
       c.email,
       c.contact,
       COUNT(cmd.idcommande) AS orders_count
     FROM clients c
     LEFT JOIN commandes cmd ON cmd.idclient = c.idclient
     GROUP BY c.idclient
     ORDER BY c.created_at DESC`
  );
  res.json(rows);
});


app.put("/orders/:id/status", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;

  const allowed = ["En cours", "En préparation", "Terminé", "Livré"];
  if (!allowed.includes(statut)) {
    return res.status(400).json({ error: "Statut invalide" });
  }

  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE commandes SET statut = ? WHERE idcommande = ?",
    [statut, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Commande introuvable" });
  }

  res.json({ success: true });
});

// AJOUT commande
app.post("/orders", async (req, res) => {
  const { idclient, modele, tissu, prix } = req.body;

  await pool.query(
    "INSERT INTO commandes (idclient, modele, tissu, prix) VALUES (?, ?, ?, ?)",
    [idclient, modele, tissu, prix]
  );

  res.json({ message: "Commande ajoutée" });
});

// COMMANDE PUBLIQUE : crée client + commande en une transaction
app.post("/orders/public", async (req, res) => {
  const { nom, prenom, email, contact, modele, tissu, prix, mesures } = req.body;

  if (!nom || !prenom || !email || !contact || !modele || !tissu || prix == null) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1) Réutiliser le client si l'email existe déjà, sinon le créer
    const [existing] = await conn.query<RowDataPacket[]>(
      "SELECT idclient FROM clients WHERE email = ?",
      [email]
    );

    let idclient: number;
    if (existing.length > 0) {
      idclient = existing[0]!.idclient;
    } else {
      const [insertClient] = await conn.query<ResultSetHeader>(
        "INSERT INTO clients (nom, prenom, email, contact) VALUES (?, ?, ?, ?)",
        [nom, prenom, email, contact]
      );
      idclient = insertClient.insertId;
    }

    // 2) Créer la commande liée à ce client
    const [insertOrder] = await conn.query<ResultSetHeader>(
      "INSERT INTO commandes (idclient, modele, tissu, mesures, prix) VALUES (?, ?, ?, ?, ?)",
      [idclient, modele, tissu, mesures ? JSON.stringify(mesures) : null, prix]
    );

    await conn.commit();
    res.json({
      success: true,
      idcommande: insertOrder.insertId,
      idclient,
    });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: (err as Error).message });
  } finally {
    conn.release();
  }
});

// ============================================================
// INSCRIPTIONS À LA FORMATION
// ============================================================

// PUBLIC : créer une inscription
app.post("/inscriptions/public", async (req, res) => {
  const { prenom, nom, email, contact, niveau, motivation, session, prix } = req.body;

  if (!prenom || !nom || !email || !contact || !niveau) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }

  try {
    const [insert] = await pool.query<ResultSetHeader>(
      `INSERT INTO inscriptions (prenom, nom, email, contact, niveau, motivation, session, prix)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        prenom,
        nom,
        email,
        contact,
        niveau,
        motivation || null,
        session || "Juin 2026",
        prix ?? 5000,
      ]
    );

    res.json({
      success: true,
      idinscription: insert.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ADMIN : liste des inscriptions
app.get("/inscriptions", requireAdmin, async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT
       idinscription,
       prenom,
       nom,
       email,
       contact,
       niveau,
       motivation,
       session,
       prix,
       statut,
       date_inscription
     FROM inscriptions
     ORDER BY date_inscription DESC`
  );
  res.json(rows);
});

// ADMIN : change le statut d'une inscription
app.put("/inscriptions/:id/status", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;

  const allowed = ["En attente", "Payée", "Confirmée", "Annulée"];
  if (!allowed.includes(statut)) {
    return res.status(400).json({ error: "Statut invalide" });
  }

  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE inscriptions SET statut = ? WHERE idinscription = ?",
    [statut, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: "Inscription introuvable" });
  }

  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});