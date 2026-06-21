import { prisma } from "../../lib/prisma";

class DetailUserService {
  async execute(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      throw new Error("Erro ao buscar detalhes do usuário");
    }
  }
}

export { DetailUserService };
