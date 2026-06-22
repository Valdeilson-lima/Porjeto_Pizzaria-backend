import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/removeItemService";

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const { itemId } = req.query as { itemId: string };

    const removeItemService = new RemoveItemService();

    try {
      const result = await removeItemService.execute({
        itemId: itemId,
      });

      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { RemoveItemController };
