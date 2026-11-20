import rateLimit from "express-rate-limit";
import { clientIp } from "./net";

export const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => clientIp(req),
});
