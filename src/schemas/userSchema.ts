import { z } from "zod";

const Roles = ["STAFF", "ADMIN"] as const;
export type Role = (typeof Roles)[number];

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome é obrigatório" })
      .min(3, "O nome precisa ter pelo menos 3 caracteres"),
    email: z.email({ message: "Endereço de email inválido" }),
    password: z
      .string({ message: "A senha é obrigatória" })
      .min(6, "A senha precisa ter pelo menos 6 caracteres"),
    role: z
      .enum(Roles, { message: "Role deve ser STAFF ou ADMIN" })
      .optional()
      .default("STAFF"),
  }),
});
