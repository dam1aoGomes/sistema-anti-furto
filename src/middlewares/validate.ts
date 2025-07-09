// src/middlewares/validate.ts
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Dados inválidos',
        details: result.error.flatten(),
      });
    }
    // Anexa os dados validados para uso posterior
    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({
        message: 'Dados inválidos',
        details: result.error.flatten()
      });
    }
    // Anexa os dados validados para uso posterior
    req.params = result.data;
    next();
  };
};
