import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Farm } from "./entity/Farm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5439,
  username: "postgres",
  password: "Postgres2022!",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Farm],
  migrations: [],
  subscribers: [],
});
