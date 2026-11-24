import chapter from "@/content/chapter.json";

type Dated = { date: string; time?: string };

export function chapterToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: chapter.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function byDate<T extends Dated>(items: readonly T[]) {
  return [...items].sort((a, b) =>
    `${a.date}T${a.time ?? ""}`.localeCompare(`${b.date}T${b.time ?? ""}`),
  );
}

export function splitByDate<T extends Dated>(items: readonly T[]) {
  const today = chapterToday();
  const sorted = byDate(items);
  return {
    upcoming: sorted.filter((item) => item.date >= today),
    past: sorted.filter((item) => item.date < today).reverse(),
  };
}

// Content is entered as local calendar values. UTC here preserves those values
// while formatting, regardless of where the server runs.
export function formatDate(date: string, time?: string) {
  const value = new Date(`${date}T${time ?? "12:00"}:00Z`);
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC", weekday: "long", month: "long", day: "numeric", year: "numeric",
  }).format(value);
  if (!time) return day;
  const clock = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC", hour: "numeric", minute: "2-digit",
  }).format(value);
  return `${day} at ${clock}`;
}
