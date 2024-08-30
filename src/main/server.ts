import setupApp from '@/main/config/app';
import { Pool } from 'pg';

// TODO: create README.MD
// TODO: create unit tests
// TODO: integrate postgres db
// TODO: create repositories

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
} = process.env

export const Client = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
  port: DB_PORT as number | undefined,
});

const app = setupApp();
app.listen(4000, () => {
  console.log(`server running on port 4000`);
});