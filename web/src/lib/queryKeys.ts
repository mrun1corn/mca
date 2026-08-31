export const queryKeys = {
  home: () => ["home"] as const,
  me: () => ["me"] as const,
  users: (search?: string) => (search ? (["users", search] as const) : (["users"] as const)),
  user: (id: string) => ["user", id] as const,
  dues: (userId: string) => ["dues", userId] as const,
  txs: (userId?: string, limit?: number) =>
    userId
      ? limit
        ? (["txs", userId, limit] as const)
        : (["txs", userId] as const)
      : (["txs"] as const),
  member: (userId: string) => ["member", userId] as const,
  reports: () => ["reports"] as const,
  investments: () => ["investments"] as const,
  withdrawals: () => ["withdrawals", "totals"] as const,
  yearlyCollection: (year: number) => ["yearly-collection", year] as const,
};
