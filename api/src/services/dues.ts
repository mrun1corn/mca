import Due from "../models/Due";

export async function getUserDues(userId: string, status: "open" | "all") {
  const q: any = { userId };
  if (status === "open") q["schedule.status"] = { $in: ["pending", "partial"] };
  const dues = await Due.find(q).sort({ createdAt: -1 });
  return dues;
}
