import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { round, distribute, allocate } from "../src/lib/math";

describe("Financial Math Utilities", () => {
  describe("round()", () => {
    test("rounds standard floating points to 2 decimal places", () => {
      assert.equal(round(10.556), 10.56);
      assert.equal(round(10.554), 10.55);
      assert.equal(round(10.5), 10.5);
      assert.equal(round(10), 10);
    });

    test("handles classic JS binary floating point precision anomalies", () => {
      // 0.1 + 0.2 = 0.30000000000000004
      assert.equal(round(0.1 + 0.2), 0.3);
      // 1.005 rounding
      assert.equal(round(1.005), 1.01);
    });
  });

  describe("distribute()", () => {
    test("splits amount equally when divisible without remainder", () => {
      const parts = distribute(100, 4);
      assert.deepEqual(parts, [25, 25, 25, 25]);
      assert.equal(parts.reduce((sum, p) => round(sum + p), 0), 100);
    });

    test("distributes remainder pennies fairly without losing cents", () => {
      // 100 divided by 3 -> 33.34, 33.33, 33.33 = exactly 100.00
      const parts = distribute(100, 3);
      assert.deepEqual(parts, [33.34, 33.33, 33.33]);
      const sum = parts.reduce((acc, val) => round(acc + val), 0);
      assert.equal(sum, 100.0);
    });

    test("handles large group splits with fractional cents correctly", () => {
      const total = 5000;
      const count = 7;
      const parts = distribute(total, count);
      assert.equal(parts.length, 7);
      const sum = parts.reduce((acc, val) => round(acc + val), 0);
      assert.equal(sum, total);
    });

    test("returns empty array for zero or negative count", () => {
      assert.deepEqual(distribute(100, 0), []);
      assert.deepEqual(distribute(100, -1), []);
    });
  });

  describe("allocate()", () => {
    test("allocates amounts proportionally according to weights", () => {
      const shares = [
        { id: "user1", weight: 50 },
        { id: "user2", weight: 50 },
      ];
      const result = allocate(1000, shares);
      assert.deepEqual(result, [
        { id: "user1", amount: 500 },
        { id: "user2", amount: 500 },
      ]);
    });

    test("handles uneven weights and preserves exact total with remainder distribution", () => {
      const shares = [
        { id: "user1", weight: 1 },
        { id: "user2", weight: 1 },
        { id: "user3", weight: 1 },
      ];
      const result = allocate(100, shares);
      assert.deepEqual(result, [
        { id: "user1", amount: 33.34 },
        { id: "user2", amount: 33.33 },
        { id: "user3", amount: 33.33 },
      ]);
      const totalAllocated = result.reduce((sum, r) => round(sum + r.amount), 0);
      assert.equal(totalAllocated, 100.0);
    });

    test("returns 0 allocation when total weight is zero", () => {
      const shares = [
        { id: "user1", weight: 0 },
        { id: "user2", weight: 0 },
      ];
      const result = allocate(500, shares);
      assert.deepEqual(result, [
        { id: "user1", amount: 0 },
        { id: "user2", amount: 0 },
      ]);
    });
  });
});
