import { Fragment, type ReactNode } from "react";
import { REPO_URL } from "@/lib/data";

/** Renders the README's inline markdown: `code`, **bold** and [links](url). */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<code key={m.index}>{m[1]}</code>);
    else if (m[2]) parts.push(<strong key={m.index}>{m[2]}</strong>);
    else {
      const href = /^https?:/.test(m[4]) ? m[4] : `${REPO_URL}/blob/main/${m[4]}`;
      parts.push(
        <a key={m.index} href={href} target="_blank" rel="noreferrer">
          <Inline text={m[3]} />
        </a>,
      );
    }
    last = re.lastIndex;
  }
  parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}
