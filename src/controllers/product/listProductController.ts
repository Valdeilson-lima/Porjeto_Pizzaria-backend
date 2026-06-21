import { Request, Response } from "express";
import { ListProductService } from "../../services/product/listProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const { disabled } = req.query as { disabled?: string };

    const listProductService = new ListProductService();
    const products = await listProductService.execute(disabled);

    return res.json(products);
  }
}

export { ListProductController };
