import { DocsSidebar } from "@/components/DocsSidebar";
import { bars } from "@/lib/data";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs">
      <DocsSidebar items={bars.map(({ slug, name, tags }) => ({ slug, name, tags }))} />
      <main id="main" className="docs-main">{children}</main>
    </div>
  );
}
