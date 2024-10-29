export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
  );
}

export function PageGallery({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">{children}</div>
  );
}
