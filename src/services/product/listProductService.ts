import { prisma } from "../../lib/prisma";

class ListProductService {
  async execute(disabled?: string) {
    const disabledFilter = disabled === undefined ? false : disabled === "true";

    const products = await prisma.product.findMany({
      where: {
        disable: disabledFilter,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        disable: true,
        categoryId: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  }
}

export { ListProductService };
