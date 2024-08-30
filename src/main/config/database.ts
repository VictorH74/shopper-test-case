import { Pool } from "pg";
// TODO: integrate postgres db

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
    port: DB_PORT ? parseInt(DB_PORT) : 5432,
});

const createMeasureTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS measure (
      measure_uuid UUID PRIMARY KEY,
      customer_code VARCHAR(50) NOT NULL,
      measure_datetime TIMESTAMPTZ NOT NULL,
      measure_type VARCHAR(10) CHECK (measure_type IN ('WATER', 'GAS')),
      measure_value INTEGER,
      has_confirmed BOOLEAN DEFAULT false,
      image_url TEXT
    );
  `;

    try {
        const res = await Client.query(queryText);
        console.log('Tabela criada ou já existente:', res.command);
    } catch (err) {
        const stack = err instanceof Error ? err.stack : undefined;
        console.error('Erro ao criar tabela:', stack);
        console.error(err);
    }
}

export const setupDbClient = async () => {
    await createMeasureTable()
}