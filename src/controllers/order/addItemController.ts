import { Request, Response } from "express";
import { AddItemOrderService } from "../../services/order/addItemOrderService";

class AddItemController {
  async handle(req: Request, res: Response) {
    const { orderId, productId, amount } = req.body;

    const addItemOrderService = new AddItemOrderService();

    try {
      const item = await addItemOrderService.execute({
        orderId,
        productId,
        amount,
      });

      return res.json(item);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { AddItemController };
