import { z } from 'zod';

export const getCustomerMeasureListDataSchema = z.object({
    query: z.object({
        measure_type: z
            .enum(['WATER', 'GAS'], {
                invalid_type_error:
                    "O valor de 'measure_type' deve ser 'WATER' ou 'GAS'",
            })
            .optional(),
    }),
});
