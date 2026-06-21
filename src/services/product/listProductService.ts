import { prisma } from "../../lib/prisma";

interface ListProductServiceProps {
  disabled?: string;
}
class ListProductService {
  async execute({ disabled }: ListProductServiceProps) {
    try {
      const products = await prisma.product.findMany({
        where: {
          disabled: disabled === "true" ? true : false,
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
    } catch (error) {
      throw new Error("Failed to list products");
    }
  }
}

export { ListProductService };
