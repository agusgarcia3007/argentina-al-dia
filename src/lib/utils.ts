import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function searchSections(items: any[], searchQuery: string) {
  return items.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
}

export function findSectionByUrl(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[],
  url: string
): string | undefined {
  for (const section of sections) {
    if (section.url === url) {
      return section.id;
    }
    if (section.items) {
      const found = findSectionByUrl(section.items, url);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

export function relativeTime(date: string) {
  const now = new Date();
  const diffInMs = new Date(date).getTime() - now.getTime();
  const rtf = new Intl.RelativeTimeFormat("es", { numeric: "always" });

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  return Math.abs(diffInSeconds) < 60
    ? rtf.format(diffInSeconds, "second")
    : Math.abs(diffInMinutes) < 60
    ? rtf.format(diffInMinutes, "minute")
    : Math.abs(diffInHours) < 24
    ? rtf.format(diffInHours, "hour")
    : Math.abs(diffInDays) < 30
    ? rtf.format(diffInDays, "day")
    : Math.abs(diffInMonths) < 12
    ? rtf.format(diffInMonths, "month")
    : rtf.format(diffInYears, "year");
}
