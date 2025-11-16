import { drizzle } from "drizzle-orm/bun-sql";
import { tables } from "./schema";
import { SQL } from "bun";


const client = new SQL(Bun.env.DATABASE_URL!)

export const db = drizzle({ client, schema: tables });
