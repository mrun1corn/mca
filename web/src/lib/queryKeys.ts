export const queryKeys = {
  home: () => ["home"],
  users: () => ["users"],
  user: (id: string) => ["user", id],
  dues: (userId: string) => ["dues", userId],
  txs: (userId: string) => ["txs", userId],
  member: (userId: string) => ["member", userId],
  reports: () => ["reports"],
  investments: () => ["investments"],
};
