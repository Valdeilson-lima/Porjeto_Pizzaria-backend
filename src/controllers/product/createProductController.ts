import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/createProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, description, price, categoryId } = req.body;
    const file = req.file;

    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Arquivo não enviado! Imagem obrigatória." });
    }
    const createProduct = new CreateProductService();

    try {
      const product = await createProduct.execute({
        name,
        description,
        price: parseInt(price),
        categoryId,
        imageBuffer: file!.buffer,
        imageName: file!.originalname,
      });
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateProductController };
