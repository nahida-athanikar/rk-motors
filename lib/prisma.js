import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db =
  globalForPrisma.db ||
  new PrismaClient({
    log: ["error", "warn"], // helps on slow network debugging
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.db = db;
}
