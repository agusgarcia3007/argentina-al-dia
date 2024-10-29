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
