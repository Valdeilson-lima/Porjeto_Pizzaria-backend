import "dotenv/config";
import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "../generated/prisma/client";

const { DB_USER, DB_PASSWORD, DB_NAME, HOST: DB_HOST } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_HOST) {
  throw new Error(
    "Missing required environment variables: DB_USER, DB_PASSWORD, DB_NAME, HOST"
  );
}

const sqlConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  server: DB_HOST,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false,
  },
};

const adapter = new PrismaMssql(sqlConfig);
const prisma = new PrismaClient({ adapter });

export { prisma };
