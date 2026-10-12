import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/CodeBlock";
import { GifPair } from "@/components/GifPair";
import { Inline } from "@/components/Inline";
import { Toc } from "@/components/Toc";
import { bars, getBar } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return bars.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bar = getBar((await params).slug);
  return bar ? { title: bar.composable, description: bar.summary } : {};
}

const SECTIONS = [
  { id: "preview", title: "Preview" },
  { id: "usage", title: "Usage" },
  { id: "sizing", title: "Sizing and behavior" },
  { id: "colors", title: "Colors" },
  { id: "api", title: "API" },
];

export default async function BarPage({ params }: Props) {
  const bar = getBar((await params).slug);
  if (!bar) notFound();

  const i = bars.indexOf(bar);
  const prev = bars[i - 1];
  const next = bars[i + 1];
  const defaults = `${bar.name}BottomBarDefaults`;
  const imports = `import ${bar.package}.${bar.name}BarItem\nimport ${bar.package}.${bar.composable}\nimport ${bar.package}.${defaults}`;
  const theming = `${bar.composable}(
    items = items,
    selectedIndex = selectedIndex,
    onItemClick = { selectedIndex = it },
    // Follow your app's theme instead of the system one.
    colors = ${defaults}.colors(darkTheme = isDarkTheme),
)`;

  return (
    <div className="doc-with-toc">
      <article className="doc">
        <p className="crumbs">
          Docs / Bottom bars / <span>{String(i + 1).padStart(2, "0")}</span>
        </p>
        <h1>
          {bar.name}
          <span className="h1-suffix">BottomBar</span>
        </h1>
        <p className="lead">{bar.summary}</p>
        <ul className="tags" aria-label="Traits">
          {bar.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <h2 id="preview">Preview</h2>
        <GifPair slug={bar.slug} name={bar.name} />
        <p className="highlight"><Inline text={bar.highlight + "."} /></p>

        <h2 id="usage">Usage</h2>
        {bar.intro.map((t, k) => <p key={k}><Inline text={t} /></p>)}
        <CodeBlock code={imports} title="Imports" />
        <CodeBlock code={bar.usage} title={`${bar.composable}.kt`} />

        <h2 id="sizing">Sizing and behavior</h2>
        {bar.notes.map((n, k) => (
          <p key={k} className={n.type === "note" ? "callout" : undefined}><Inline text={n.text} /></p>
        ))}

        <h2 id="colors">Colors</h2>
        <p>
          Colors come from <code>{defaults}.colors(darkTheme)</code>, <code>lightColors(...)</code> and{" "}
          <code>darkColors(...)</code>. Start from either palette and override only what you need.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Color</th><th>Used for</th></tr></thead>
            <tbody>
              {bar.colors.map(([name, use]) => (
                <tr key={name}><td><Inline text={name} /></td><td><Inline text={use} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={theming} title="Theming" />

        <h2 id="api">API</h2>
        <p>The full signature of the composable and its item class:</p>
        <CodeBlock code={bar.signature} title={`${bar.package}`} />

        <nav className="pager" aria-label="More bottom bars">
          {prev ? (
            <Link href={`/docs/${prev.slug}/`} className="pager-link">
              <span>Previous</span>
              {prev.name}
            </Link>
          ) : (
            <Link href="/docs/" className="pager-link">
              <span>Previous</span>
              Getting started
            </Link>
          )}
          {next && (
            <Link href={`/docs/${next.slug}/`} className="pager-link next">
              <span>Next</span>
              {next.name}
            </Link>
          )}
        </nav>
      </article>
      <Toc sections={SECTIONS} />
    </div>
  );
}
