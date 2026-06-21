import { prisma } from "../../lib/prisma";
import { cloudinary } from "../../config/cloudinary";

interface CreateProductServiceProps {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  imageBuffer: Buffer;
  imageName: string;
}

class CreateProductService {
  async execute({
    name,
    description,
    price,
    categoryId,
    imageBuffer,
    imageName,
  }: CreateProductServiceProps) {
    const catelgoryExists = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!catelgoryExists) {
      throw new Error("Categoria não encontrada!");
    }

    let bannerUrl = "";

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader
          .upload_stream(
            {
              folder: "products",
              resource_type: "image",
              public_id: `${Date.now()}-${imageName.split(".")[0]}`,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(imageBuffer);

        const bufferStream = require("stream").Readable.from(imageBuffer);
        bufferStream.pipe(uploadStream);
      });

      bannerUrl = result.secure_url;
    } catch (error) {
      throw new Error("Erro ao fazer upload da imagem!");
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        banner: bannerUrl,
        categoryId: categoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        banner: true,
        categoryId: true,
        createdAt: true,
      },
    });
    return product;
  }
}

export { CreateProductService };
