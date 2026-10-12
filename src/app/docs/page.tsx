import type { Metadata } from "next";
import Link from "next/link";
import { Blocks } from "@/components/Blocks";
import { CodeBlock } from "@/components/CodeBlock";
import { Toc } from "@/components/Toc";
import { bars, gif, guide } from "@/lib/data";

export const metadata: Metadata = { title: "Getting started" };

const SECTIONS = [
  { id: "installation", title: "Installation" },
  { id: "basic-usage", title: "Basic usage" },
  { id: "light-and-dark", title: "Light and dark" },
  { id: "custom-colors", title: "Custom colors" },
  { id: "label-style", title: "Label style and insets" },
  { id: "navigation-3", title: "With Navigation 3" },
  { id: "all-bars", title: "All bottom bars" },
];

const BASIC = `var selectedIndex by rememberSaveable { mutableIntStateOf(0) }

Scaffold(
    bottomBar = {
        HaloBottomBar(
            items = items,
            selectedIndex = selectedIndex,
            onItemClick = { selectedIndex = it },
        )
    },
) { innerPadding ->
    // Your screen content
}`;

export default function GettingStarted() {
  return (
    <div className="doc-with-toc">
      <article className="doc">
        <p className="crumbs">Docs / Overview</p>
        <h1>Getting started</h1>
        <p className="lead">
          Every bar in Compose Bottombar shares one shape of API: a list of <code>XxxBarItem</code>s, the selected
          index and a click callback. Learn it once here, then pick a bar from the sidebar.
        </p>

        <h2 id="installation">Installation</h2>
        <Blocks blocks={guide.installation} />

        <h2 id="basic-usage">Basic usage</h2>
        <p>
          Each item takes a <code>label</code>, an <code>icon</code> and an optional <code>selectedIcon</code> (usually
          the filled twin of the outlined icon). Any <code>ImageVector</code> works. Keep the selected index in state
          and update it from <code>onItemClick</code>:
        </p>
        <CodeBlock code={BASIC} title="Kotlin" />
        <p>
          <code>onItemClick</code> also fires when the user taps the tab that is already selected, so you can scroll to
          the top or pop to the tab&apos;s root.
        </p>

        <h2 id="light-and-dark">Light and dark</h2>
        <Blocks blocks={guide.lightDark} />

        <h2 id="custom-colors">Custom colors</h2>
        <Blocks blocks={guide.customColors} />
        <p className="callout">
          Every bar has its own <code>XxxBottomBarDefaults</code> with <code>colors(darkTheme)</code>,{" "}
          <code>lightColors(...)</code> and <code>darkColors(...)</code>. Each bar&apos;s page lists the colors it takes.
        </p>

        <h2 id="label-style">Label style and insets</h2>
        <Blocks blocks={guide.labelStyle} />

        <h2 id="navigation-3">With Navigation 3</h2>
        <Blocks blocks={guide.navigation} />

        <h2 id="all-bars">All bottom bars</h2>
        <ul className="bar-grid">
          {bars.map((b) => (
            <li key={b.slug}>
              <Link href={`/docs/${b.slug}/`} className="bar-card">
                <span className="bar-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="theme-light-only" src={gif(b.slug, "light")} alt="" loading="lazy" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="theme-dark-only" src={gif(b.slug, "dark")} alt="" loading="lazy" />
                </span>
                <span className="bar-card-name">{b.name}</span>
                <span className="bar-card-text">{b.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <Toc sections={SECTIONS} />
    </div>
  );
}
