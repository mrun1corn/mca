import { test, describe } from "node:test";
import assert from "node:assert/strict";
import * as math from "../src/lib/math";

describe("Investment Financial Logic", () => {
  test("distributes investment principal equally across contributors", () => {
    const totalPrincipal = 10000;
    const memberCount = 6;
    const parts = math.distribute(totalPrincipal, memberCount);

    assert.equal(parts.length, 6);
    // 10000 / 6 = 1666.6667 -> 4 parts of 1666.67, 2 parts of 1666.66
    assert.deepEqual(parts, [1666.67, 1666.67, 1666.67, 1666.67, 1666.66, 1666.66]);
    assert.equal(
      parts.reduce((sum, p) => math.round(sum + p), 0),
      totalPrincipal
    );
  });

  test("allocates investment returns proportionally based on contributor principal shares", () => {
    const contributors = [
      { id: "user_a", weight: 5000 },
      { id: "user_b", weight: 3000 },
      { id: "user_c", weight: 2000 },
    ];

    const totalReturnYield = 1000; // 10% return on 10,000 total principal
    const returnAllocations = math.allocate(totalReturnYield, contributors);

    assert.deepEqual(returnAllocations, [
      { id: "user_a", amount: 500 },
      { id: "user_b", amount: 300 },
      { id: "user_c", amount: 200 },
    ]);
  });
});
