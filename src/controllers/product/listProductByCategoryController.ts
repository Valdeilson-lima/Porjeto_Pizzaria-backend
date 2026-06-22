import { Request, Response } from "express";
import { ListProductByCategoryService } from "../../services/product/listProductByCategoryService";

class ListProductByCategoryController {
  async handle(req: Request, res: Response) {
    const { categoryId } = req.query as { categoryId: string };

    const listProductByCategoryService = new ListProductByCategoryService();
    const products = await listProductByCategoryService.execute({
      categoryId: categoryId,
    });

    return res.json(products);
  }
}

export { ListProductByCategoryController };
