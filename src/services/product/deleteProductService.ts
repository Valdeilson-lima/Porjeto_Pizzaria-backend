import { prisma } from "../../lib/prisma";

interface DeleteProductServiceProps {
  productId: string;
}

class DeleteProductService {
  async execute({ productId }: DeleteProductServiceProps) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          disabled: true,
        },
      });

      return { message: "Produto deletado / desativado com sucesso" };
    } catch (error) {
      throw new Error("Erro ao deletar produto: " + (error as Error).message);
    }
  }
}

export { DeleteProductService };
