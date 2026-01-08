import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });

      next();
    } catch (error: any) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors
      });
    }
  };
