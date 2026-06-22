import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/sendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    const { orderId, name } = req.body;

    const sendOrderService = new SendOrderService();

    try {
      const order = await sendOrderService.execute({ name, orderId });
      return res.json(order);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { SendOrderController };
