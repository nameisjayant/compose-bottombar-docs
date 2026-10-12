import { gif } from "@/lib/data";

/** The bar's light and dark recordings, each on the background it was recorded against. */
export function GifPair({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="gif-pair">
      {(["light", "dark"] as const).map((theme) => (
        <figure key={theme} className={`gif-frame gif-${theme}`}>
          <figcaption>
            <span className={`swatch swatch-${theme}`} aria-hidden="true" />
            {theme === "light" ? "Light" : "Dark"}
          </figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element -- animated GIFs, served as-is */}
          <img src={gif(slug, theme)} alt={`${name} bottom bar in ${theme} theme, switching between tabs`} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}
