import { prisma } from "../../lib/prisma";

interface DeleteOrderProps {
  orderId: string;
}

class DeleteOrderService {
  async execute({ orderId }: DeleteOrderProps) {
    const orderExists = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!orderExists) {
      throw new Error("Pedido não encontrado");
    }
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        disabled: true,
      },
    });

    return {
      message: "Pedido deletado com sucesso",
    };
  }
}

export { DeleteOrderService };
