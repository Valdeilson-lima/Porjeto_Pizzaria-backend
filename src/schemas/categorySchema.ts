import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome da categoria é obrigatório" })
      .min(3, "O nome da categoria deve conter pelo menos 3 caracteres"),
  }),
});
