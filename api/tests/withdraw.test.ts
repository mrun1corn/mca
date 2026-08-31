import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  filterEligibleMembers,
  calculateScheduleDates,
  generateRepaymentSchedule,
  createSplitTransactionPayloads,
} from "../src/services/withdraw";
import { Types } from "mongoose";

describe("Withdraw Service Logic", () => {
  describe("filterEligibleMembers()", () => {
    test("excludes the taker from funding their own cash-out", () => {
      const users = [
        { _id: "taker1", name: "Alice" },
        { _id: "user2", name: "Bob" },
        { _id: "user3", name: "Charlie" },
      ];

      const eligible = filterEligibleMembers(users, "taker1");
      assert.equal(eligible.length, 2);
      assert.deepEqual(
        eligible.map((u) => u.name),
        ["Bob", "Charlie"]
      );
    });

    test("excludes custom excluded members in addition to the taker", () => {
      const users = [
        { _id: "taker1", name: "Alice" },
        { _id: "user2", name: "Bob" },
        { _id: "user3", name: "Charlie" },
        { _id: "user4", name: "David" },
      ];

      const eligible = filterEligibleMembers(users, "taker1", ["user3"]);
      assert.equal(eligible.length, 2);
      assert.deepEqual(
        eligible.map((u) => u.name),
        ["Bob", "David"]
      );
    });
  });

  describe("calculateScheduleDates()", () => {
    test("generates monthly dates starting from defaultDate when useDefaultDate is true", () => {
      const dates = calculateScheduleDates(3, new Date("2026-01-01"), {
        useDefaultDate: true,
        defaultDate: "2026-02-15",
        startDate: null,
        endDate: null,
      });

      assert.equal(dates.length, 3);
      assert.equal(dates[0].toISOString().slice(0, 10), "2026-02-15");
      assert.equal(dates[1].toISOString().slice(0, 10), "2026-03-15");
      assert.equal(dates[2].toISOString().slice(0, 10), "2026-04-15");
    });
  });

  describe("generateRepaymentSchedule()", () => {
    test("calculates monthly principal and interest with proper rounding", () => {
      const months = 3;
      const principal = 3000;
      const monthlyRatePct = 1.0; // 1% per month on remaining principal
      const dates = [new Date("2026-02-01"), new Date("2026-03-01"), new Date("2026-04-01")];

      const schedule = generateRepaymentSchedule(months, principal, monthlyRatePct, dates);
      assert.equal(schedule.length, 3);

      // Month 1: Remaining Principal = 3000 -> Principal Part = 1000, Interest = 30 (1% of 3000) -> Total = 1030
      assert.equal(schedule[0].principalPart, 1000);
      assert.equal(schedule[0].interest, 30);
      assert.equal(schedule[0].totalDue, 1030);

      // Month 2: Remaining Principal = 2000 -> Principal Part = 1000, Interest = 20 (1% of 2000) -> Total = 1020
      assert.equal(schedule[1].principalPart, 1000);
      assert.equal(schedule[1].interest, 20);
      assert.equal(schedule[1].totalDue, 1020);

      // Month 3: Remaining Principal = 1000 -> Principal Part = 1000, Interest = 10 (1% of 1000) -> Total = 1010
      assert.equal(schedule[2].principalPart, 1000);
      assert.equal(schedule[2].interest, 10);
      assert.equal(schedule[2].totalDue, 1010);
    });

    test("handles zero interest rate cleanly", () => {
      const months = 2;
      const principal = 1000;
      const dates = [new Date("2026-02-01"), new Date("2026-03-01")];

      const schedule = generateRepaymentSchedule(months, principal, 0, dates);
      assert.equal(schedule[0].interest, 0);
      assert.equal(schedule[0].totalDue, 500);
      assert.equal(schedule[1].interest, 0);
      assert.equal(schedule[1].totalDue, 500);
    });
  });
});
