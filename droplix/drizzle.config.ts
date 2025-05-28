import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: ".env",
});

if (!process.env.DATABASE_URL) {
  throw new Error("Database url is not define inside the .env file ");
}
export default defineConfig({
  out: "./drizzle",
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    table: "__drizzle_migration",
    schema: "public",
  },
  verbose: true, //this will show all the behind the scenes that happend in migration all of them
  strict: true, //ask before doing anything like do you really want to do that
});
