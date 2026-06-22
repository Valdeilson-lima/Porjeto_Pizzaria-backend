import { prisma } from "../../lib/prisma";

interface DetailOrderServiceProps {
  orderId: string;
}

class DetailOrderService {
  async execute({ orderId }: DetailOrderServiceProps) {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
      select: {
        id: true,
        table: true,
        name: true,
        status: true,
        draft: true,
        createdAt: true,
        updatedAt: true,
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

    if (!order) {
      throw new Error("Pedido não encontrado.");
    }

    return order;
  }
}

export { DetailOrderService };
