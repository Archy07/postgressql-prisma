import type { NextFunction, Request, Response } from 'express';
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  res.status(500);
  res.json('Internal server error');
}