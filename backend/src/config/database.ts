import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "ventasfix",
  synchronize: true, // Use only in dev, generates schema automatically
  logging: false,
  entities: [__dirname + "/../models/*.{ts,js}"],
  subscribers: [],
  migrations: [],
});
