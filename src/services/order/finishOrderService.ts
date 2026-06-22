import { prisma } from "../../lib/prisma";

interface FinishORderProps {
  orderId: string;
}

class FinishOrderService {
  async execute({ orderId }: FinishORderProps) {
    const orderExists = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!orderExists) {
      throw new Error("Pedido não encontrado");
    }
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: true,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
      },
    });

    return order;
  }
}

export { FinishOrderService };
