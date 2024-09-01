import { z } from 'zod';

const EnvSchema = z.object({
    GEMINI_API_KEY: z.string({
        required_error: "Variável de ambiente 'GEMINI_API_KEY' não encontrado!",
    }),
    DB_HOST: z.string({
        required_error: "Variável de ambiente 'DB_HOST' não encontrado!",
    }),
    DB_NAME: z.string({
        required_error: "Variável de ambiente 'DB_NAME' não encontrado!",
    }),
    DB_USER: z.string({
        required_error: "Variável de ambiente 'DB_USER' não encontrado!",
    }),
    DB_PASS: z.string({
        required_error: "Variável de ambiente 'DB_PASS' não encontrado!",
    }),
    DB_PORT: z.coerce
        .number({
            required_error: "Variável de ambiente 'DB_PORT' não encontrado!",
        })
        .positive()
        .default(5432),
    BASE_URL: z
        .string({
            required_error: "Variável de ambiente 'BASE_URL' não encontrado!",
        })
        .url(),
});

export const env = EnvSchema.parse(process.env);
