import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
    pool?: Pool;
};

const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
    throw new Error("Missing DATABASE_URL (or POSTGRES_URL) env var");
}

const pool =
    globalForPrisma.pool ??
    new Pool({
    connectionString,
});

attachDatabasePool(pool); 

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
    adapter: new PrismaPg(pool),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
    globalForPrisma.prisma = prisma;
}

export default prisma;
