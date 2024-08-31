import { Pool } from "pg";

const {
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_PORT,
} = process.env

export const Client = new Pool({
    host: 'postgres_db',
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

const createImageTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS image (
      image_uuid UUID PRIMARY KEY,
      buffer_data BYTEA  NOT NULL,
      type VARCHAR(10) NOT NULL
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
    await createImageTable()
}