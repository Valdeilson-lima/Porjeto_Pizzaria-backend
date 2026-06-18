import { Router, Request, Response } from "express";

const router = Router();

router.post("/users", (_req: Request, res: Response) => {
  res.send("User created!");
});

export default router;
