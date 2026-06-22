import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/detailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.query as { orderId: string };

    const detailOrderService = new DetailOrderService();

    try {
      const order = await detailOrderService.execute({ orderId });

      return res.json(order);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { DetailOrderController };
