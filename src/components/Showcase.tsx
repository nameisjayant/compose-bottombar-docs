"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { gif } from "@/lib/data";

interface Item { slug: string; name: string; summary: string }

const INTERVAL = 4200;

/**
 * A phone-shaped frame that cycles through the bars. Both theme recordings are
 * rendered and CSS shows the one matching the site theme.
 */
export function Showcase({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);

  // Always advances; a dot click restarts the timer since it changes `index`.
  // Reduced-motion users still get the cycle, just without the slide-in (see globals.css).
  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, items.length]);

  const bar = items[index];
  return (
    <div className="showcase">
      <div className="phone">
        <div className="phone-notch" aria-hidden="true" />
        <div className="phone-screen">
          <div className="phone-content" aria-hidden="true">
            <div className="sk sk-title" />
            <div className="sk sk-card" />
            <div className="sk-row"><div className="sk sk-tile" /><div className="sk sk-tile" /></div>
            <div className="sk sk-line" />
            <div className="sk sk-line short" />
          </div>
          <div className="phone-bar" key={bar.slug}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="theme-light-only" src={gif(bar.slug, "light")} alt={`${bar.name} bottom bar`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="theme-dark-only" src={gif(bar.slug, "dark")} alt="" />
          </div>
        </div>
      </div>
      <div className="showcase-caption" aria-live="polite">
        <Link href={`/docs/${bar.slug}/`} className="showcase-name">{bar.name}<span>BottomBar</span></Link>
        <div className="showcase-dots" role="tablist" aria-label="Bottom bars">
          {items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={it.name}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
