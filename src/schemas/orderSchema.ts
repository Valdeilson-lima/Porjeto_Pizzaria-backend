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

export const detailOrderSchema = z.object({
  query: z.object({
    orderId: z.string({ message: "O ID do pedido é obrigatório" }),
  }),
});

export const removeItemSchema = z.object({
  query: z.object({
    itemId: z.string({ message: "O ID do item é obrigatório" }),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    orderId: z.string({ message: "O ID do pedido é obrigatório" }),
    productId: z.string({ message: "O ID do produto é obrigatório" }),
    amount: z
      .number({ message: "A quantidade é obrigatória" })
      .int({ message: "A quantidade deve ser um inteiro" })
      .positive({ message: "A quantidade deve ser positiva" }),
  }),
});
