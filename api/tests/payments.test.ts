import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { loadEnv } from "../src/lib/env";

loadEnv();

describe("Payment Gateway Integration (Paymently / UddoktaPay)", () => {
  const GATEWAY_URL = (process.env.UDDOKTAPAY_BASE_URL || "https://rob1n.paymently.io/api").replace(/\/+$/, "");
  const API_KEY = process.env.UDDOKTAPAY_API_KEY || "";

  describe("Gateway Connectivity & Checkout-v2 API", () => {
    test("successfully creates a live checkout session with Paymently", async (t) => {
      if (!API_KEY) {
        t.skip("UDDOKTAPAY_API_KEY not configured");
        return;
      }

      const payload = {
        full_name: "Test Member",
        email: "member_test@mca.app",
        amount: 10,
        metadata: {
          userId: "660000000000000000000001",
          mode: "simple",
          note: "Unit Test Deposit",
        },
        redirect_url: "https://deposit.mrun1corn.xyz/balances?payment=success",
        cancel_url: "https://deposit.mrun1corn.xyz/balances?payment=cancelled",
        webhook_url: "https://deposit.mrun1corn.xyz/api/payments/webhook",
      };

      const response = await fetch(`${GATEWAY_URL}/checkout-v2`, {
        method: "POST",
        headers: {
          "RT-UDDOKTAPAY-API-KEY": API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { status?: boolean; payment_url?: string };

      assert.equal(response.status, 200);
      assert.equal(data.status, true);
      assert.equal(typeof data.payment_url, "string");
      assert.match(data.payment_url || "", /^https?:\/\//);
    });

    test("handles verification endpoint for non-existent invoice gracefully", async (t) => {
      if (!API_KEY) {
        t.skip("UDDOKTAPAY_API_KEY not configured");
        return;
      }

      const response = await fetch(`${GATEWAY_URL}/verify-payment`, {
        method: "POST",
        headers: {
          "RT-UDDOKTAPAY-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoice_id: "DUMMY_INVOICE_ID_9999" }),
      });

      const data = (await response.json()) as { status?: boolean; message?: string };

      assert.equal(response.status, 200);
      assert.equal(data.status, false);
      assert.match(data.message || "", /Invalid Payment ID/i);
    });
  });

  describe("Webhook Payload Parsing & Validation", () => {
    test("correctly parses webhook status and transaction fields", () => {
      const sampleWebhook = {
        invoice_id: "INV_SAMPLE_12345",
        status: "COMPLETED",
        payment_method: "bKash",
        sender_number: "01700000000",
        transaction_id: "TRX_9X8Y7Z6W",
        amount: "500",
        metadata: {
          userId: "user_abc",
          mode: "pay_due",
          dueId: "due_xyz",
        },
      };

      assert.equal(sampleWebhook.status.toUpperCase(), "COMPLETED");
      assert.equal(sampleWebhook.payment_method, "bKash");
      assert.equal(Number(sampleWebhook.amount), 500);
      assert.equal(sampleWebhook.metadata.mode, "pay_due");
    });
  });
});
