import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/deleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const { productId } = req.query as { productId: string };
    const deleteProductService = new DeleteProductService();

    try {
      const product = await deleteProductService.execute({
        productId: productId,
      });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}

export { DeleteProductController };
