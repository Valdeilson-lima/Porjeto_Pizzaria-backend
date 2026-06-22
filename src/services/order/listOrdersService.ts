import { prisma } from "../../lib/prisma";

interface ListOrdersServiceProps {
  draft?: string;
}

class ListOrdersService {
  async execute({ draft }: ListOrdersServiceProps) {
    const orders = await prisma.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
        disabled: false,
      },
      select: {
        id: true,
        table: true,
        name: true,
        status: true,
        draft: true,
        disabled: true,
        createdAt: true,
        Items: {
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                banner: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }
}

export { ListOrdersService };
