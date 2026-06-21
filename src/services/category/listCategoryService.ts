import { prisma } from "../../lib/prisma";

class ListCategoryService {
  async execute() {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    });

    return categories;
  }
}

export { ListCategoryService };
