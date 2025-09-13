import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  status: number;
  details?: any;
  constructor(message: string, status = 400, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}

