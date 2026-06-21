import { prisma } from "../../lib/prisma";

class ListProductService {
  async execute(disabled?: string) {
    const allProducts = await prisma.product.findMany({
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

    const disabledFilter = disabled === undefined ? false : disabled === "true";

    return allProducts.filter((product) => product.disable === disabledFilter);
  }
}

export { ListProductService };
