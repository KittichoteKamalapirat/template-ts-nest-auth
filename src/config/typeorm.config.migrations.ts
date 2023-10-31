import dotenv from "dotenv-safe";
import { getEnvPath } from "../utils/getEnvPath";

// IMPORTANT: cannot rely on nestjs because this file is used before the app even bootstrap
dotenv.config({
  path: getEnvPath(),
  allowEmptyValues: true,
});

const typeormConfigMigrations = {
  type: "postgres" as const,
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "chain123",
  // database: "shaberi_dev",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  autoLoadEntities: true,
  entities: ["src/**/*.entity.ts"],
  seeds: ["src/db/seeds/**/*.ts"],
  factories: ["src/db/factories/**/*.ts"],
  synchronize: true,
  logging: true,
};

export default typeormConfigMigrations;
