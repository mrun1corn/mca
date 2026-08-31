import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  isOverdue,
  applyPenaltyToScheduleItem,
  settleScheduleItem,
  processDueSettlement,
  DueScheduleItem,
  DuePenaltyRule,
  DepositInput,
} from "../src/services/deposit";

describe("Deposit Service Logic", () => {
  describe("isOverdue()", () => {
    test("returns false when deposit date is on or before due date + grace days", () => {
      const dueDate = new Date("2026-05-01T00:00:00.000Z");
      const onTimeDate = new Date("2026-05-01T00:00:00.000Z");
      const withinGraceDate = new Date("2026-05-04T00:00:00.000Z"); // 3 grace days

      assert.equal(isOverdue(dueDate, onTimeDate, 3), false);
      assert.equal(isOverdue(dueDate, withinGraceDate, 3), false);
    });

    test("returns true when deposit date exceeds grace period", () => {
      const dueDate = new Date("2026-05-01T00:00:00.000Z");
      const lateDate = new Date("2026-05-05T00:00:00.000Z"); // 4 days after
      assert.equal(isOverdue(dueDate, lateDate, 3), true);
    });
  });

  describe("applyPenaltyToScheduleItem()", () => {
    test("does not apply penalty when penalty is disabled or not included", () => {
      const item: DueScheduleItem = {
        dueDate: "2026-01-01",
        principalPart: 1000,
        interest: 50,
        totalDue: 1050,
        paid: 0,
        status: "pending",
      };
      const occurredAt = new Date("2026-06-01");
      const totalDue = applyPenaltyToScheduleItem(item, occurredAt, false);
      assert.equal(totalDue, 1050);
      assert.equal(item.penaltyApplied, undefined);
    });

    test("applies monthly percentage penalty on unpaid balance when overdue", () => {
      const item: DueScheduleItem = {
        dueDate: "2026-01-01",
        principalPart: 1000,
        interest: 50,
        totalDue: 1050,
        paid: 50,
        status: "partial",
      };
      const occurredAt = new Date("2026-02-01");
      const rule: DuePenaltyRule = { enabled: true, monthlyPenaltyPct: 2.0, graceDays: 3 };

      // Unpaid balance is 1050 - 50 = 1000. 2% of 1000 = 20.
      const totalDue = applyPenaltyToScheduleItem(item, occurredAt, true, rule);
      assert.equal(totalDue, 1070);
      assert.equal(item.penaltyApplied, 20);
      assert.equal(item.totalDue, 1070);
    });

    test("does not double-apply penalty if penalty was already applied previously", () => {
      const item: DueScheduleItem = {
        dueDate: "2026-01-01",
        principalPart: 1000,
        interest: 50,
        totalDue: 1070,
        penaltyApplied: 20,
        paid: 0,
        status: "pending",
      };
      const occurredAt = new Date("2026-03-01");
      const rule: DuePenaltyRule = { enabled: true, monthlyPenaltyPct: 2.0, graceDays: 3 };

      const totalDue = applyPenaltyToScheduleItem(item, occurredAt, true, rule);
      assert.equal(totalDue, 1070);
      assert.equal(item.penaltyApplied, 20);
    });
  });

  describe("settleScheduleItem()", () => {
    test("marks item as paid when payment covers full due amount", () => {
      const item: DueScheduleItem = {
        dueDate: "2026-05-01",
        principalPart: 500,
        interest: 25,
        totalDue: 525,
        paid: 0,
        status: "pending",
      };
      const input: DepositInput = {
        userId: "u1",
        mode: "pay_due",
        amount: 600,
        date: "2026-05-01",
      };

      const result = settleScheduleItem(item, 600, input, new Date("2026-05-01"));
      assert.equal(result.paidAmount, 525);
      assert.equal(result.changed, true);
      assert.equal(item.paid, 525);
      assert.equal(item.status, "paid");
    });

    test("marks item as partial when payment is less than total due", () => {
      const item: DueScheduleItem = {
        dueDate: "2026-05-01",
        principalPart: 500,
        interest: 25,
        totalDue: 525,
        paid: 0,
        status: "pending",
      };
      const input: DepositInput = {
        userId: "u1",
        mode: "pay_due",
        amount: 300,
        date: "2026-05-01",
      };

      const result = settleScheduleItem(item, 300, input, new Date("2026-05-01"));
      assert.equal(result.paidAmount, 300);
      assert.equal(result.changed, true);
      assert.equal(item.paid, 300);
      assert.equal(item.status, "partial");
    });

    test("returns 0 paid and changed:false if item is already paid", () => {
      const item: DueScheduleItem = {
        dueDate: "2026-05-01",
        principalPart: 500,
        interest: 25,
        totalDue: 525,
        paid: 525,
        status: "paid",
      };
      const input: DepositInput = {
        userId: "u1",
        mode: "pay_due",
        amount: 500,
        date: "2026-05-01",
      };

      const result = settleScheduleItem(item, 500, input, new Date("2026-05-01"));
      assert.equal(result.paidAmount, 0);
      assert.equal(result.changed, false);
    });
  });

  describe("processDueSettlement()", () => {
    test("cascades payment across multiple schedule installments until depleted", () => {
      const schedule: DueScheduleItem[] = [
        {
          dueDate: "2026-01-01",
          principalPart: 500,
          interest: 0,
          totalDue: 500,
          paid: 0,
          status: "pending",
        },
        {
          dueDate: "2026-02-01",
          principalPart: 500,
          interest: 0,
          totalDue: 500,
          paid: 0,
          status: "pending",
        },
      ];

      const due = { schedule };
      const input: DepositInput = {
        userId: "u1",
        mode: "pay_due",
        amount: 750,
        date: "2026-01-01",
      };

      const result = processDueSettlement(due, 750, input, new Date("2026-01-01"));
      assert.equal(result.changed, true);
      assert.equal(result.remainingPayment, 0);
      assert.equal(schedule[0].status, "paid");
      assert.equal(schedule[0].paid, 500);
      assert.equal(schedule[1].status, "partial");
      assert.equal(schedule[1].paid, 250);
    });
  });
});
