import { prisma } from "../../lib/prisma";

interface RemoveItemServiceProps {
  itemId: string;
}

class RemoveItemService {
  async execute({ itemId }: RemoveItemServiceProps) {
    const item = await prisma.item.findFirst({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new Error("Item não encontrado.");
    }

    await prisma.item.delete({
      where: {
        id: itemId,
      },
    });

    return { message: "Item removido com sucesso." };
  }
}

export { RemoveItemService };
