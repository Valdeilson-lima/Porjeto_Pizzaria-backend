import { ListProductRepository } from "../../repositories/product/listProductRepository";

class ListProductService {
  async execute(disabled?: string) {
    const disabledFilter = disabled === undefined ? false : disabled === "true";

    const repository = new ListProductRepository();
    const products = await repository.execute(disabledFilter);

    return products;
  }
}

export { ListProductService };
