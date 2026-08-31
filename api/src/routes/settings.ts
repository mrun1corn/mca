import { Router, Request, Response, NextFunction } from "express";
import { requireAuth, requireRole } from "../lib/auth";
import Setting from "../models/Setting";
import { z } from "zod";
import { parseBody } from "../lib/validation";

const router = Router();

const UpdateSettingsSchema = z.object({
  currency: z.string().min(1).max(10).optional(),
  currencySymbol: z.string().min(1).max(10).optional(),
  appName: z.string().min(1).max(50).optional(),
});

const DEFAULT_SETTINGS = {
  currency: "BDT",
  currencySymbol: "৳",
  appName: process.env.VITE_APP_NAME || "Community Savings",
};

/**
 * GET /api/settings
 * Public endpoint to fetch community settings (currency code, symbol, app name).
 */
router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const settingsDocs = await Setting.find({
      key: { $in: ["currency", "currencySymbol", "appName"] },
    });

    const settingsMap = new Map(settingsDocs.map((s) => [s.key, s.value]));

    const response = {
      currency: (settingsMap.get("currency") as string) || DEFAULT_SETTINGS.currency,
      currencySymbol: (settingsMap.get("currencySymbol") as string) || DEFAULT_SETTINGS.currencySymbol,
      appName: (settingsMap.get("appName") as string) || DEFAULT_SETTINGS.appName,
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/settings
 * Admin endpoint to update community currency, symbol, and organization details.
 */
router.patch(
  "/",
  requireAuth as any,
  requireRole(["admin"]) as any,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = parseBody(UpdateSettingsSchema, req.body);

      const updates: Array<Promise<any>> = [];
      if (body.currency) {
        updates.push(
          Setting.findOneAndUpdate(
            { key: "currency" },
            { $set: { value: body.currency.toUpperCase().trim() } },
            { upsert: true, new: true }
          )
        );
      }

      if (body.currencySymbol) {
        updates.push(
          Setting.findOneAndUpdate(
            { key: "currencySymbol" },
            { $set: { value: body.currencySymbol.trim() } },
            { upsert: true, new: true }
          )
        );
      }

      if (body.appName) {
        updates.push(
          Setting.findOneAndUpdate(
            { key: "appName" },
            { $set: { value: body.appName.trim() } },
            { upsert: true, new: true }
          )
        );
      }

      await Promise.all(updates);

      // Return refreshed settings
      const settingsDocs = await Setting.find({
        key: { $in: ["currency", "currencySymbol", "appName"] },
      });
      const settingsMap = new Map(settingsDocs.map((s) => [s.key, s.value]));

      res.json({
        ok: true,
        settings: {
          currency: (settingsMap.get("currency") as string) || DEFAULT_SETTINGS.currency,
          currencySymbol: (settingsMap.get("currencySymbol") as string) || DEFAULT_SETTINGS.currencySymbol,
          appName: (settingsMap.get("appName") as string) || DEFAULT_SETTINGS.appName,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
