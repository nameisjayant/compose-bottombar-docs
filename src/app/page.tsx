import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { Logo } from "@/components/Logo";
import { Showcase } from "@/components/Showcase";
import { bars, DEPENDENCY, MAVEN_URL, REPO_URL, version } from "@/lib/data";

const FEATURES = [
  { icon: "M5 12.5l4.5 4.5L19 7.5", title: "Ready to use", text: "Pass a list of items and the selected index, and you get a finished bar." },
  { icon: "M12 3a9 9 0 1 0 0 18V3z", title: "Light and dark built in", text: "Every bar ships both palettes and follows the system theme by default." },
  { icon: "M4 17c3-8 6-10 8-10s5 2 8 10", title: "Animated by default", text: "Springs, glides, ripples and morphs, each tuned to the bar's own shape." },
  { icon: "M12 4a8 8 0 1 0 8 8c0-1.5-1.2-2-2.4-2H15a2 2 0 0 1-2-2V6.4C13 5.2 13.5 4 12 4z", title: "Customizable", text: "Override any color through lightColors() / darkColors(), plus label style and insets." },
  { icon: "M12 5.5a1.5 1.5 0 1 0 0-.01M6 9h12M12 9v11M8 20l4-6 4 6", title: "Accessible", text: "Items are selectable tabs in a selectable group, so TalkBack reads them right." },
  { icon: "M7 17L17 7M9 7h8v8", title: "Light dependencies", text: "Only Compose UI, Foundation and Animation. No Material or icons forced on you." },
];

export default function HomePage() {
  const showcase = bars.map(({ slug, name, summary }) => ({ slug, name, summary }));
  return (
    <main id="main" className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-logo">
              <Logo size={64} />
            </div>
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              {bars.length} bottom bars for Jetpack Compose
            </p>
            <h1 id="hero-title">
              Bottom bars that <span className="grad">feel alive</span>.
            </h1>
            <p className="lead">
              A collection of beautiful, animated, customizable bottom bars for Jetpack Compose. Drop one in, pass your
              items, and get a polished bar that looks right in light and dark themes.
            </p>
            <div className="install">
              <code>
                <span className="tk-fn">implementation</span>(<span className="tk-string">&quot;io.github.nameisjayant:compose-bottombar:{version}&quot;</span>)
              </code>
              <CopyButton text={DEPENDENCY} label="Copy dependency" />
            </div>
            <div className="cta-row">
              <Link href={`/docs/${bars[0].slug}/`} className="btn btn-primary">
                Browse the bars
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/docs/" className="btn btn-ghost">Get started</Link>
            </div>
            <ul className="stats">
              <li><strong>{bars.length}</strong><span>bar styles</span></li>
              <li><strong>2</strong><span>themes each</span></li>
              <li><strong>24</strong><span>min SDK</span></li>
              <li><a href={MAVEN_URL} target="_blank" rel="noreferrer"><strong>v{version}</strong><span>Maven Central</span></a></li>
            </ul>
          </div>
          <Showcase items={showcase} />
        </div>

        <ul className="features">
          {FEATURES.map((f) => (
            <li key={f.title} className="feature">
              <span className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d={f.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h2>{f.title}</h2>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>

        <footer className="home-foot">
          Apache 2.0 · Made with Jetpack Compose by{" "}
          <a href="https://github.com/nameisjayant" target="_blank" rel="noreferrer">Jayant Kumar</a> ·{" "}
          <a href={REPO_URL} target="_blank" rel="noreferrer">GitHub</a>
        </footer>
      </section>
    </main>
  );
}
