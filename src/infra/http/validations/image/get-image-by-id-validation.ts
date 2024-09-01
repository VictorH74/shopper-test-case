import { z } from "zod";

export const getImageByIdDataSchema = z.object({
    params: z.object({
        image_uuid: z.string().uuid({ message: 'Tipo de parâmetro inválido' }),
        extension: z.enum(['png', 'jpeg', 'jpg', 'webp'], {
            invalid_type_error: 'Extensão de arquivo não suportada'
        }),
    })
});