export function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function parseISO(date: string): Date {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date format: ${date}`);
  }
  return d;
}
