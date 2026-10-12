#!/usr/bin/env python3
"""Builds src/data/bottombar.json and public/gifs/ from the ComposeBottombar library repo.

Run it again whenever a bar is added to the library:

    npm run sync -- ~/AndroidStudioProjects/ComposeBottombar

Bars and their order come from BottomBarType.kt; usage text, code and color tables
come from the README's "### <Name> bottom bar" sections; signatures come from the
library sources.
"""
import json
import re
import shutil
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent


def sections(readme: str) -> dict[str, str]:
    """Splits the README into {heading: body} for every ## and ### heading."""
    out, title, buf, in_code = {}, None, [], False
    for line in readme.splitlines():
        if line.startswith("```"):
            in_code = not in_code
        if not in_code and re.match(r"^#{2,3} ", line):
            if title:
                out[title] = "\n".join(buf).strip()
            title, buf = line.lstrip("#").strip(), []
        else:
            buf.append(line)
    if title:
        out[title] = "\n".join(buf).strip()
    return out


def blocks(body: str) -> list[dict]:
    """Splits a section body into paragraphs, code blocks, tables and notes."""
    out, lines, i = [], body.splitlines(), 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("```"):
            lang, code, i = line[3:].strip() or "text", [], i + 1
            while not lines[i].startswith("```"):
                code.append(lines[i])
                i += 1
            out.append({"type": "code", "lang": lang, "code": "\n".join(code)})
        elif line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"-+", c) for c in cells):
                    rows.append(cells)
                i += 1
            out.append({"type": "table", "head": rows[0], "rows": rows[1:]})
            continue
        elif line.startswith(">"):
            out.append({"type": "note", "text": line.lstrip("> ").strip()})
        elif line.strip() and not line.startswith("<"):
            para = [line]
            while i + 1 < len(lines) and lines[i + 1].strip() and not re.match(r"^(```|\||>|<)", lines[i + 1]):
                i += 1
                para.append(lines[i])
            out.append({"type": "p", "text": " ".join(para)})
        i += 1
    return out


def signature(src: str, name: str) -> str:
    """Pulls `public fun NameBottomBar(...)` and `public class NameBarItem(...)` out of the source."""
    parts = []
    for pattern in (rf"public fun {name}BottomBar\(\n.*?\n\)", rf"public class {name}BarItem\(\n.*?\n\)"):
        m = re.search(pattern, src, re.S)
        if m:
            parts.append(m.group(0).replace("public ", ""))
    return "\n\n".join(parts)


def tags(name: str, text: str, code: str) -> list[str]:
    t = text.lower()
    out = ["Floating" if ("floating" in t or "padding(" in code) else "Edge to edge"]
    out.append("Center orb" if ("middle item" in t or "middle one" in t) else "Any tab")
    icon_only = any(k in t for k in ("only shows icons", "icon-only", "show only their icon", "only shows icons until", "show only `icon`"))
    out.append("Icon only" if icon_only else "Icon + label")
    return out


def main(repo: Path) -> None:
    readme = (repo / "README.md").read_text()
    secs = sections(readme)
    enum_src = (repo / "app/src/main/java/com/nameisjayant/composebottombar/home/BottomBarType.kt").read_text()
    entries = re.findall(r'(\w+)\(\s*title = "(\w+)",\s*description = "([^"]+)"', enum_src)

    highlights = {}
    for row in blocks(secs["Bottom bars"]):
        if row["type"] == "table":
            for cells in row["rows"]:
                highlights[cells[0].strip("*")] = cells[2]

    bars = []
    for name, title, short in entries:
        slug = name.lower()
        body = blocks(secs[f"{name} bottom bar"])
        # Halo's dimensions and colors live in the shared sub-sections that follow it.
        if name == "Halo":
            body += [b for b in blocks(secs["Label style and insets"]) if b["type"] == "p"]
            body += [b for b in blocks(secs["Custom colors"]) if b["type"] == "table"]
        code_i = next(i for i, b in enumerate(body) if b["type"] == "code")
        src = (repo / f"bottombar/src/main/java/com/nameisjayant/bottombar/{slug}/{name}BottomBar.kt").read_text()
        intro = [b for b in body[:code_i] if b["type"] == "p"]
        rest = body[code_i + 1:]
        colors = next((b for b in rest if b["type"] == "table"), None)
        notes = [b for b in rest if b["type"] in ("p", "note") and not b["text"].startswith("Colors come from")]
        bars.append({
            "slug": slug,
            "name": name,
            "composable": title,
            "summary": short,
            "highlight": highlights.get(name, short),
            "intro": [b["text"] for b in intro],
            "usage": body[code_i]["code"],
            "notes": notes,
            "colors": colors["rows"] if colors else [],
            "signature": signature(src, name),
            "tags": tags(name, " ".join(b.get("text", "") for b in body), body[code_i]["code"]),
            "package": f"com.nameisjayant.bottombar.{slug}",
        })
        for theme in ("light", "dark"):
            gif = repo / f"docs/gifs/{slug}-{theme}.gif"
            if gif.exists():
                (SITE / "public/gifs").mkdir(parents=True, exist_ok=True)
                shutil.copy2(gif, SITE / f"public/gifs/{slug}-{theme}.gif")

    version = re.search(r"^VERSION_NAME=(.+)$", (repo / "gradle.properties").read_text(), re.M).group(1).strip()
    guide = {
        "installation": blocks(secs["Installation"]),
        "lightDark": blocks(secs["Light and dark"]),
        "customColors": [b for b in blocks(secs["Custom colors"]) if b["type"] != "table"],
        "labelStyle": [b for b in blocks(secs["Label style and insets"]) if b["type"] == "code"],
        "navigation": blocks(secs["With Navigation 3"]),
        "features": [re.sub(r"^- \S+ ", "", line) for line in secs["Features"].splitlines() if line.startswith("- ")],
    }
    shutil.copy2(repo / "docs/logo.svg", SITE / "public/logo.svg")

    data = {"version": version, "bars": bars, "guide": guide}
    (SITE / "src/data").mkdir(parents=True, exist_ok=True)
    (SITE / "src/data/bottombar.json").write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n")
    print(f"{len(bars)} bars, version {version}")


if __name__ == "__main__":
    main(Path(sys.argv[1] if len(sys.argv) > 1 else "~/AndroidStudioProjects/ComposeBottombar").expanduser())
