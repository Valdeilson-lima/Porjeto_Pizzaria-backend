import { prisma } from "../../lib/prisma";

interface ItemProps {
  orderId: string;
  productId: string;
  amount: number;
}

class AddItemOrderService {
  async execute({ orderId, productId, amount }: ItemProps) {
    try {
      const orderExists = await prisma.order.findFirst({
        where: {
          id: orderId,
        },
      });

      if (!orderExists) {
        throw new Error("Pedido não encontrado.");
      }

      const productExists = await prisma.product.findFirst({
        where: {
          id: productId,
          disabled: false,
        },
      });

      if (!productExists) {
        throw new Error("Produto não encontrado.");
      }

      const item = await prisma.item.create({
        data: {
          orderId,
          productId,
          amount,
        },
        select: {
          id: true,
          amount: true,
          orderId: true,
          productId: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              description: true,
              banner: true,
            },
          },
        },
      });

      return item;
    } catch (error) {
      throw new Error("Erro ao adicionar item ao pedido.");
    }
  }
}

export { AddItemOrderService };
