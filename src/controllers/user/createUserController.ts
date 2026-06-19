import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUserService";

class CreateUserController {
  async handle(_req: Request, res: Response) {
    const { name, email, password } = _req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });
    res.status(201).json({ message: user });
  }
}

export { CreateUserController };
