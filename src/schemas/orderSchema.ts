import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O número da mesa é obrigatório" })
      .int({ message: "O número da mesa deve ser um inteiro" })
      .positive({ message: "O número da mesa deve ser positivo" }),
    name: z
      .string({ message: "O nome do cliente é obrigatório" })
      .min(1, "O nome do cliente é obrigatório"),
  }),
});

export const listOrdersSchema = z.object({
  query: z.object({
    draft: z
      .string()
      .optional()
      .refine((value) => value === "true" || value === "false", {
        message: "O valor do campo draft deve ser 'true' ou 'false'",
      }),
  }),
});
