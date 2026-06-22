import { prisma } from "../../lib/prisma";

interface ListProductByCategoryServiceProps {
  categoryId: string;
}
class ListProductByCategoryService {
  async execute({ categoryId }: ListProductByCategoryServiceProps) {
    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
        disabled: false,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        disabled: true,
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
        name: "asc",
      },
    });

    return products;
  }
}

export { ListProductByCategoryService };
