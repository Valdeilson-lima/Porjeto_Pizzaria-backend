import { Request, Response } from "express";
import { ListProductService } from "../../services/product/listProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const disabled = req.query.disabled as string | undefined;

    const listProductService = new ListProductService();

    const products = await listProductService.execute({ disabled: disabled });

    return res.json(products);
  }
}

export { ListProductController };
