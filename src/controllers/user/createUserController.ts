import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUserService";

class CreateUserController {
  async handle(_req: Request, res: Response) {
    const { name, email, password } = _req.body;
    console.log("Received data:", { name, email, password });

    const createUserService = new CreateUserService();

    const user = await createUserService.execute();
    res.status(201).json({ message: user });
  }
}

export { CreateUserController };
