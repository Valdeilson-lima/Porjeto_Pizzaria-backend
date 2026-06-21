import { prisma } from "../../lib/prisma";

class ListProductRepository {
  async execute(disabled: boolean) {
    const products = await prisma.product.findMany({
      where: {
        disable: disabled,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        price: true,
        disable: true,
        createdAt: true,
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      disabled: product.disable,
      createdAt: product.createdAt,
    }));
  }
}

export { ListProductRepository };
