import mysql, { type PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Récupère une variable d'env, lance une erreur claire si elle manque
function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} manquant dans .env`);
  return value;
}

// La plupart des MySQL hébergés (TiDB, Aiven, Railway, etc.) exigent SSL.
// On l'active dès que DB_SSL=true, et on accepte aussi DATABASE_URL si fourni.
const useSsl = process.env.DB_SSL === "true";

let poolOptions: PoolOptions;

if (process.env.DATABASE_URL) {
  poolOptions = { uri: process.env.DATABASE_URL };
} else {
  poolOptions = {
    host: required("DB_HOST"),
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: required("DB_USER"),
    password: process.env.DB_PASSWORD ?? "",
    database: required("DB_NAME"),
    connectionLimit: 10,
  };
}

// On n'ajoute la clé `ssl` que si nécessaire (exactOptionalPropertyTypes refuse undefined)
if (useSsl) {
  poolOptions.ssl = { rejectUnauthorized: false };
}

const pool = mysql.createPool(poolOptions);

export default pool;
