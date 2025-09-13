import { Router } from "express";
import { requireAuth } from "../lib/auth";
import { getUserDues } from "../services/dues";

const router = Router();

router.get("/users/:id/dues", requireAuth as any, async (req: any, res, next) => {
  try {
    const status = (req.query.status as string) || "open";
    // users can only view their own
    if (req.user.role === "user" && req.user.sub !== req.params.id) return res.status(403).json({ error: "Forbidden" });
    const dues = await getUserDues(req.params.id, status === "all" ? "all" : "open");
    res.json(dues);
  } catch (e) {
    next(e);
  }
});

export default router;
