import { ModeToggle } from "@/components/mode-toggle";
import { Pages } from "@/components/pages";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { sections } from "@/lib/sections";
import { findSectionByUrl } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugs } = await params;

  const pageCode = findSectionByUrl(
    sections.navMain,
    `/${slugs.join("/")}`
  ) as PageCode;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <ModeToggle />
        </div>
        {slugs.map((slug, i) => (
          <h1 key={i} className="text-2xl font-semibold">
            {decodeURI(slug)}
          </h1>
        ))}
      </header>
      <Pages pageCode={pageCode} />
    </>
  );
}
