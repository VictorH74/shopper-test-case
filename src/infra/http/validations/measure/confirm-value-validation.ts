import { z } from "zod";

export const confirmValueDataSchema = z.object({
    body: z.object({
        measure_uuid: z.string({
            required_error: "'measure_uuid' é obrigatório",
        }).uuid({ message: "Formato inválido de 'measure_uuid'" }),
        confirmed_value: z.number({
            invalid_type_error: "O valor de 'confirmed_value' deve ser numérico",
            required_error: "'confirmed_value' é obrigatório",
        })
    })
});