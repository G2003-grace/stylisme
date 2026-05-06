import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Récupère une variable d'env, lance une erreur claire si elle manque
function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} manquant dans .env`);
  return value;
}

const pool = mysql.createPool({
  host: required("DB_HOST"),
  user: required("DB_USER"),
  password: process.env.DB_PASSWORD ?? "",
  database: required("DB_NAME"),
});

export default pool;
