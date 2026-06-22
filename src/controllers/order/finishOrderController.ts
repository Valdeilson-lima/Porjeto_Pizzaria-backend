import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/finishOrderService";

class FinishOrderController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.body;

    const finishOrderService = new FinishOrderService();

    try {
      const order = await finishOrderService.execute({ orderId });
      return res.json(order);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { FinishOrderController };
