import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/order/deleteOrderService";

class DeleteOrderController {
  async handle(req: Request, res: Response) {
    const orderId = req.query?.orderId as string;

    const deleteOrderService = new DeleteOrderService();

    try {
      const order = await deleteOrderService.execute({ orderId });
      return res.json(order);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeleteOrderController };
