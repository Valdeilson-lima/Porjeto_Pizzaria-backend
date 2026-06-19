import { ZodType, ZodError } from "zod";
import { Response, Request, NextFunction } from "express";

export const validateSchema =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ error: error.issues.map((issue) => issue.message) });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
