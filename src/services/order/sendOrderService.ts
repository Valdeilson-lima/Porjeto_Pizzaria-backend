import { prisma } from "../../lib/prisma";

interface SendOrderProps {
  name?: string;
  orderId: string;
}

class SendOrderService {
  async execute({ name, orderId }: SendOrderProps) {
    try {
      const existingOrder = await prisma.order.findFirst({
        where: {
          id: orderId,
        },
      });

      if (!existingOrder) {
        throw new Error("Pedido não encontrado");
      }
      const order = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          draft: false,
          name,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return order;
    } catch (error) {
      throw new Error("Falha ao enviar o pedido");
    }
  }
}

export { SendOrderService };
