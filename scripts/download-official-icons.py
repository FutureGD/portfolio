#!/usr/bin/env python3
"""Download official brand SVG icons for the tech stack.

Sources:
  - devicon (https://github.com/devicons/devicon) for C# — has the real
    official C# hexagonal logo with the two-tone purple + white "C#"
    monogram. simpleicons doesn't have C# at all.
  - simpleicons.org (via GitHub raw) for everything else.

Each icon keeps its REAL official brand color. The tech-stack component
renders every icon inside a constant light-colored box, so brand colors
that would be invisible on a dark background (GitHub #181617 black,
Unity #4d4d4d dark gray) are still clearly visible.

Run:  python3 scripts/download-official-icons.py
"""

import re
import urllib.request
from pathlib import Path

ICONS_DIR = Path("/home/z/my-project/public/icons")
ICONS_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Devicon (https://github.com/devicons/devicon)
# Used for C# because simpleicons doesn't have it and my hand-written
# approximation was wrong. Devicon's csharp-original is the real official
# .NET brand logo: hexagonal shape, two-tone purple (#9B4F96 + #68217A),
# white "C#" monogram in the center.
# ---------------------------------------------------------------------------
DEVICONS = {
    "csharp.svg": "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
}

# ---------------------------------------------------------------------------
# simpleicons.org slugs → (local filename, official brand hex color).
# Brand hex values from simpleicons metadata.
# ALL icons keep their real brand color — the tech-stack component's
# constant-light box makes every color visible in both themes.
# ---------------------------------------------------------------------------
SIMPLE_ICONS = {
    "cpp.svg":            ("cplusplus",     "#00599C"),  # C++ blue
    "python.svg":         ("python",        "#3776AB"),  # Python blue
    "unity.svg":          ("unity",         "#4D4D4D"),  # Unity dark gray — visible against the light icon box
    "firebase.svg":       ("firebase",      "#FFCA28"),  # Firebase yellow
    "blender.svg":        ("blender",       "#F5792A"),  # Blender orange
    "git.svg":            ("git",           "#F05032"),  # Git orange-red
    "github.svg":         ("github",        "#181717"),  # GitHub black — visible against the light icon box
    "github-actions.svg": ("githubactions", "#2088FF"),  # GitHub Actions blue
}


def fetch_url(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (portfolio-asset-generator)"},
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        if resp.status != 200:
            raise RuntimeError(f"HTTP {resp.status} for {url}")
        return resp.read().decode("utf-8")


def add_aria_label(svg: str, label: str) -> str:
    """Add aria-label for screen readers if not present."""
    if "aria-label" not in svg:
        svg = svg.replace(
            "<svg ",
            f'<svg aria-label="{label} icon" ',
            1,
        )
    return svg


def inject_brand_color(svg: str, brand_hex: str, expected_name: str) -> str:
    """Inject brand color as fill on the root <svg> tag.

    simpleicons.org's GitHub raw SVGs have NO fill attribute — they
    inherit from parent CSS. We inject the official brand hex so the
    icon always renders in its brand color.
    """
    label = expected_name.replace(".svg", "")
    if re.search(r'<svg[^>]*\sfill="', svg):
        svg = re.sub(
            r'(<svg[^>]*\s)fill="[^"]*"',
            rf'\1fill="{brand_hex}"',
            svg,
            count=1,
        )
    else:
        svg = re.sub(
            r'<svg(\s)',
            rf'<svg fill="{brand_hex}"\1',
            svg,
            count=1,
        )
    return add_aria_label(svg, label)


def main() -> None:
    print("Downloading official brand icons...\n")

    succeeded = []
    failed = []

    # Devicons (C#)
    for filename, url in DEVICONS.items():
        try:
            svg = fetch_url(url)
            # Devicon SVGs already have proper brand colors baked in.
            # Just add aria-label.
            svg = add_aria_label(svg, filename.replace(".svg", ""))
            (ICONS_DIR / filename).write_text(svg)
            print(f"  ✓ {filename:25} ← devicon  (real official C# logo)")
            succeeded.append(filename)
        except Exception as exc:
            print(f"  ✗ {filename:25} ← FAILED: {exc}")
            failed.append((filename, str(exc)))

    # Simpleicons
    for filename, (slug, brand_hex) in SIMPLE_ICONS.items():
        try:
            url = f"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/{slug}.svg"
            svg = fetch_url(url)
            svg = inject_brand_color(svg, brand_hex, filename)
            (ICONS_DIR / filename).write_text(svg)
            print(f"  ✓ {filename:25} ← simpleicons/{slug}  color={brand_hex}")
            succeeded.append(filename)
        except Exception as exc:
            print(f"  ✗ {filename:25} ← FAILED: {exc}")
            failed.append((filename, str(exc)))

    print(f"\nSummary: {len(succeeded)} downloaded, {len(failed)} failed")

    if failed:
        print("\nFailed downloads:")
        for name, err in failed:
            print(f"  {name}: {err}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
