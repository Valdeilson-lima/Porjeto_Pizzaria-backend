import { prisma } from "../../lib/prisma";

interface ICreateCategory {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: ICreateCategory) {
    try {
      const categoryAlreadyExists = await prisma.category.findFirst({
        where: {
          name,
        },
      });

      if (categoryAlreadyExists) {
        throw new Error("Categoria já existe");
      }

      const category = await prisma.category.create({
        data: {
          name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      throw new Error("Erro ao criar categoria: " + (error as Error).message);
    }
  }
}
export { CreateCategoryService };
