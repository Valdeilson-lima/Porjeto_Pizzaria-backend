import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/detailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const userId = req.userId!;
    const detailUserService = new DetailUserService();

    const user = await detailUserService.execute(userId);

    return res.json(user);
  }
}

export { DetailUserController };
