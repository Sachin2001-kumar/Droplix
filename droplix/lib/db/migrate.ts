//this is migrate manually you can done by using one simple command also It is just for learning purpose

import { migrate } from "drizzle-orm/neon-http/migrator";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

if (!process.env.DATABASE_URL) {
  throw new Error("Database url is not define inside the .env file ");
}

async function runMigration() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);

    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("All Migration are successfully done");
  } catch (error) {
    console.log("All Migration are successfully not done");
    process.exit(1);
  }
}

runMigration();
