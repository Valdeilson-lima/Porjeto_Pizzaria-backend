import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/createUserController";
import { AuthUserController } from "./controllers/user/authUsercontroller";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { DetailUserController } from "./controllers/user/detailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";
import { CreateCategoryController } from "./controllers/category/createCategoryController";
import { CreateOrderController } from "./controllers/order/createOrderController";
import {
  addItemSchema,
  createOrderSchema,
  deleteOrderSchema,
  detailOrderSchema,
  finishOrderSchema,
  listOrdersSchema,
  removeItemSchema,
  sendOrderSchema,
} from "./schemas/orderSchema";
import { ListCategoryController } from "./controllers/category/listCategoryController";
import { createCategorySchema } from "./schemas/categorySchema";
import { CreateProductController } from "./controllers/product/createProductController";
import { ListProductController } from "./controllers/product/listProductController";
import { DeleteProductController } from "./controllers/product/deleteProductController";
import { ListProductByCategoryController } from "./controllers/product/listProductByCategoryController";
import {
  createProductSchema,
  listProductsSchema,
  listProductByCategorySchema,
} from "./schemas/productSchema";
import { ListOrdersController } from "./controllers/order/listOrdersController";
import { AddItemController } from "./controllers/order/addItemController";
import { RemoveItemController } from "./controllers/order/removeItemController";
import { DetailOrderController } from "./controllers/order/detailOrderController";
import { SendOrderController } from "./controllers/order/sendOrderController";
import { FinishOrderController } from "./controllers/order/finishOrderController";
import { DeleteOrderController } from "./controllers/order/deleteOrderController";

const router = Router();
const upload = multer(multerConfig);

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle
);

router.get("/me", isAuthenticated, new DetailUserController().handle);

router.get("/categories", isAuthenticated, new ListCategoryController().handle);

router.post(
  "/categories",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle
);

router.post(
  "/products",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductsSchema),
  new ListProductController().handle
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductByCategorySchema),
  new ListProductByCategoryController().handle
);

router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle
);

router.get(
  "/orders",
  isAuthenticated,
  validateSchema(listOrdersSchema),
  new ListOrdersController().handle
);

router.post(
  "/order/add",
  isAuthenticated,
  validateSchema(addItemSchema),
  new AddItemController().handle
);

router.delete(
  "/order/remove",
  isAuthenticated,
  validateSchema(removeItemSchema),
  new RemoveItemController().handle
);

router.get(
  "/order/detail",
  isAuthenticated,
  validateSchema(detailOrderSchema),
  new DetailOrderController().handle
);

router.put(
  "/order/send",
  isAuthenticated,
  validateSchema(sendOrderSchema),
  new SendOrderController().handle
);

router.put(
  "/order/finish",
  isAuthenticated,
  validateSchema(finishOrderSchema),
  new FinishOrderController().handle
);

router.delete(
  "/order",
  isAuthenticated,
  validateSchema(deleteOrderSchema),
  new DeleteOrderController().handle
);

export default router;
