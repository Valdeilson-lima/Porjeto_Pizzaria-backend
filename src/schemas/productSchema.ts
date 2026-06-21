import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "O nome do produto é obrigatório!"),
    price: z
      .string({ message: "O preço é obrigatório!" })
      .regex(/^\d+$/, { message: "O preço deve ser um número!" }),
    description: z.string().min(1, "A descrição do produto é obrigatória!"),
    categoryId: z.string({ message: "O ID da categoria é obrigatório!" }),
  }),
});

export const listProductsSchema = z.object({
  query: z.object({
    disabled: z.string().optional(),
  }),
});
