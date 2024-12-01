import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
export const validateParams =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    console.log('Validando param:', req.params);
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        message: 'Path parameters validation error.',
        errors: result.error.issues,
      });
    }
    req.params = result.data;
    next();
  };