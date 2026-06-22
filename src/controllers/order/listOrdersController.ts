import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/listOrdersService";

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const draft = req.query?.draft as string | undefined;

    const listOrdersService = new ListOrdersService();

    const orders = await listOrdersService.execute({ draft: draft });

    return res.json(orders);
  }
}

export { ListOrdersController };
