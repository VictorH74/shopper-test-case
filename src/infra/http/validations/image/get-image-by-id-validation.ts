import { z } from "zod";

export const getImageByIdDataSchema = z.object({
    params: z.object({
        image_uuid: z.string().uuid({ message: 'Tipo de parâmetro inválido' }),
    })
});