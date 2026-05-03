/**
 * Centralized financial math utilities to ensure consistency and fairness.
 * Uses 2-decimal precision (cents-based) for all calculations.
 */

/**
 * Rounds a number to 2 decimal places.
 */
export function round(val: number): number {
  return Math.round(val * 100) / 100;
}

/**
 * Fairly distributes a total amount into N equal parts.
 * Uses a distributive loop to handle remainders (0.01 at a time).
 */
export function distribute(total: number, count: number): number[] {
  if (count <= 0) return [];
  const base = Math.floor((total * 100) / count) / 100;
  let remainder = round(total - base * count);
  
  const parts = new Array(count).fill(base);
  let i = 0;
  while (remainder > 0) {
    parts[i % count] = round(parts[i % count] + 0.01);
    remainder = round(remainder - 0.01);
    i++;
  }
  return parts;
}

/**
 * Fairly allocates a total amount across specific shares (proportional distribution).
 * Useful for investment returns or weighted splits.
 */
export function allocate(total: number, shares: { id: string; weight: number }[]): { id: string; amount: number }[] {
  const totalWeight = shares.reduce((sum, s) => sum + s.weight, 0);
  if (totalWeight <= 0) return shares.map(s => ({ id: s.id, amount: 0 }));

  const allocations = shares.map(s => ({
    id: s.id,
    amount: Math.floor((total * s.weight * 100) / totalWeight) / 100
  }));

  let allocated = allocations.reduce((sum, a) => sum + a.amount, 0);
  let remainder = round(total - allocated);
  
  let i = 0;
  while (remainder > 0 && allocations.length > 0) {
    allocations[i % allocations.length].amount = round(allocations[i % allocations.length].amount + 0.01);
    remainder = round(remainder - 0.01);
    i++;
  }

  return allocations;
}
