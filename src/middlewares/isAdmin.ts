import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Não autorizado" });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(401).json({ message: "Não autorizado" });
    return;
  }

  if (user.role !== "ADMIN") {
    res.status(403).json({ message: "Acesso negado" });
    return;
  }

  next();
}
