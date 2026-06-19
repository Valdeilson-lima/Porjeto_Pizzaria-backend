import { Router } from "express";
import { CreateUserController } from "./controllers/user/createUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchema";

const router = Router();

router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

export default router;
