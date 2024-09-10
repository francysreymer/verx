import { DataSource } from "typeorm";
import { Farm } from "~/entities/Farm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5439,
  username: "postgres",
  password: "Postgres2022!",
  database: "verx",
  synchronize: true,
  logging: false,
  entities: [Farm],
  migrations: [],
  subscribers: [],
});
