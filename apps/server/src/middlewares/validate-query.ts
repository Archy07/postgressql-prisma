import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
export const validateQuery =
    (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.query);
        if (!result.success) {
            return res.status(400).json({
                message: 'Query parameters validation error.',
                errors: result.error.issues,
            });
        }
        req.query = result.data;
        next();
    };