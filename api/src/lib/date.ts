export function addMonths(date: Date, months: number, anchorDate?: Date): Date {
  const anchor = anchorDate || date;
  const target = new Date(date);
  const desiredDay = anchor.getDate();

  // Set day to 1 first to avoid native JS overflow (e.g. Jan 31 -> March 3)
  target.setDate(1);
  target.setMonth(target.getMonth() + months);

  // Clamp to the last day of the target month
  const daysInTargetMonth = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(desiredDay, daysInTargetMonth));

  return target;
}

export function parseISO(date: string): Date {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date format: ${date}`);
  }
  return d;
}
