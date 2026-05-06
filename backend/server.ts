import express, { type RequestHandler } from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "./db";

const app = express();

app.use(cors());
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});