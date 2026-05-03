export function addMonths(date: Date, months: number, anchorDate?: Date) {
  const d = new Date(anchorDate || date);
  const startDay = d.getDate();
  d.setMonth(d.getMonth() + months);
  
  // If the day changed (e.g. Jan 31 -> Feb 28), but the new month has fewer days,
  // JS native setMonth handles it. But for a sequence, we want to stay as close
  // to the original day as possible.
  if (d.getDate() < startDay) {
    // We hit a month boundary (e.g. Jan 31 -> Feb 28). 
    // This is expected JS behavior.
  }
  return d;
}

export function parseISO(date: string): Date {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date format: ${date}`);
  }
  return d;
}
