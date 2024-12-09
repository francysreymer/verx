import dotenvSafe from 'dotenv-safe';
import { DataSource } from 'typeorm';

import { Farm } from '@/entities/Farm';

dotenvSafe.config({
  allowEmptyValues: true,
});

export const db = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Farm],
  migrations: [],
  subscribers: [],
});
