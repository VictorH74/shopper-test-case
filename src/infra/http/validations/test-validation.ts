import { z } from "zod";

export const tesDataSchema = z.object({
    params: z.object({
      paramValue: z.string({
        required_error: "'paramValue' é obrigatório!",
        invalid_type_error: "'paramValue' deve ser do tipo string!"
      })
    }),
    query: z.object({
      mandatoryPathVariable: z.coerce.date({
        required_error: "'mandatoryPathVariable' é obrigatório!",
        invalid_type_error: "'mandatoryPathVariable' deve ser uma data válida!"
      }),
      optionalPathVariable: z.string({
        invalid_type_error: "'optionalPathVariable' deve ser do tipo string!"
      }).optional()
    }),
  });