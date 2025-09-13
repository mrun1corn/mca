import { ZodSchema } from "zod";
import { AppError } from "./errors";

export function parseBody<T>(schema: ZodSchema<T>, data: unknown): T {
  const res = schema.safeParse(data);
  if (!res.success) {
    throw new AppError("Validation failed", 400, res.error.flatten());
  }
  return res.data;
}
