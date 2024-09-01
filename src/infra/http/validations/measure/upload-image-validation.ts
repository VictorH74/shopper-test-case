import { Base64 } from 'js-base64';
import { z } from 'zod';

export const uploadImageDataSchema = z.object({
    body: z.object({
        image: z
            .string({
                required_error: "'image' é obrigatório",
            })
            .transform((val) => {
                return val.replace(/^data:image\/\w+;base64,/, '');
            })
            .refine(Base64.isValid, {
                message: "'image' deve ser uma string no formato base64",
            }),
        customer_code: z.string({
            required_error: "'customer_code' é obrigatório",
        }),
        measure_datetime: z.coerce.date({
            invalid_type_error: "O valor de 'measure_datetime' é inválido",
        }),
        measure_type: z.enum(['WATER', 'GAS'], {
            invalid_type_error:
                "O valor de 'measure_type' deve ser 'WATER' ou 'GAS'",
        }),
    }),
});
