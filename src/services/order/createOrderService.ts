import { prisma } from "../../lib/prisma";

interface CreateOrderServiceProps {
  table: number;
  name?: string;
}

class CreateOrderService {
  async execute({ table, name }: CreateOrderServiceProps) {
    const orderExists = await prisma.order.findFirst({
      where: {
        table,
        status: false,
      },
    });

    if (orderExists) {
      throw new Error("Já existe um pedido para esta mesa! Mesa em aberto.");
    }

    const order = await prisma.order.create({
      data: {
        table,
        name,
      },
      select: {
        id: true,
        table: true,
        name: true,
        status: true,
        draft: true,
        createdAt: true,
      },
    });

    return order;
  }
}

export { CreateOrderService };
