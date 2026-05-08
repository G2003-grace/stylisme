import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Récupère une variable d'env, lance une erreur claire si elle manque
function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} manquant dans .env`);
  return value;
}

// La plupart des MySQL hébergés (Aiven, Railway, Clever Cloud, etc.) exigent SSL.
// On l'active dès que DB_SSL=true, et on accepte aussi DATABASE_URL si fourni.
const useSsl = process.env.DB_SSL === "true";

const pool = process.env.DATABASE_URL
  ? mysql.createPool({
      uri: process.env.DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
    })
  : mysql.createPool({
      host: required("DB_HOST"),
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: required("DB_USER"),
      password: process.env.DB_PASSWORD ?? "",
      database: required("DB_NAME"),
      ssl: useSsl ? { rejectUnauthorized: false } : undefined,
      connectionLimit: 10,
    });

export default pool;
