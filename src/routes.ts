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
import { ListCategoryController } from "./controllers/category/listCategoryController";
import { createCategorySchema } from "./schemas/categorySchema";
import { CreateProductController } from "./controllers/product/createProductController";
import { ListProductController } from "./controllers/product/listProductController";
import {
  createProductSchema,
  listProductsSchema,
} from "./schemas/productSchema";

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

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductsSchema),
  new ListProductController().handle
);

router.post(
  "/products",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle
);

export default router;
