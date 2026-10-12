import raw from "@/data/bottombar.json";

export type Block =
  | { type: "p" | "note"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface Bar {
  slug: string;
  name: string;
  composable: string;
  summary: string;
  highlight: string;
  intro: string[];
  usage: string;
  notes: { type: "p" | "note"; text: string }[];
  colors: string[][];
  signature: string;
  tags: string[];
  package: string;
}

interface Data {
  version: string;
  bars: Bar[];
  guide: {
    installation: Block[];
    lightDark: Block[];
    customColors: Block[];
    labelStyle: Block[];
    navigation: Block[];
    features: string[];
  };
}

const data = raw as Data;

export const version = data.version;
export const bars = data.bars;
export const guide = data.guide;

export const REPO_URL = "https://github.com/nameisjayant/compose-bottombar";
export const MAVEN_URL = "https://central.sonatype.com/artifact/io.github.nameisjayant/compose-bottombar";
export const DEPENDENCY = `implementation("io.github.nameisjayant:compose-bottombar:${version}")`;

export function getBar(slug: string): Bar | undefined {
  return bars.find((b) => b.slug === slug);
}

/** Prefixes a public/ path with the deploy base path (empty unless BASE_PATH is set). */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export function gif(slug: string, theme: "light" | "dark"): string {
  return asset(`/gifs/${slug}-${theme}.gif`);
}
