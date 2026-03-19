import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


const globalForPrisma = globalThis;
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg(new Pool({ connectionString }));

export const db =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
