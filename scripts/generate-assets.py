#!/usr/bin/env python3
"""Generate all SVG placeholder assets for the portfolio.

Creates:
  - 5 project thumbnail SVGs (distinct color palettes & motifs)
  - 1 SVG that stands in for a "gif" media (so the GIF player can be tested
    without committing a binary file)
  - 1 .mp4 stub file (the video player will fail to load it but the empty-state
    fallback will render — exercising both code paths)
  - 13 tech-stack icon SVGs (simple monochrome marks)
  - favicon.svg + a placeholder resume.txt that the user replaces

All paths are written under /home/z/my-project/public/.
"""

from pathlib import Path

PUBLIC = Path("/home/z/my-project/public")
PROJECTS_DIR = PUBLIC / "projects"
ICONS_DIR = PUBLIC / "icons"
PROJECTS_DIR.mkdir(parents=True, exist_ok=True)
ICONS_DIR.mkdir(parents=True, exist_ok=True)


# ---------- project thumbnails ----------

THUMBS = {
    "aether-drift.svg": {
        "bg": "#0b1020",
        "accent": "#7dd3fc",
        "fg": "#e2e8f0",
        "title": "AETHER DRIFT",
        "subtitle": "Anti-gravity racing",
        "motif": "speed",
    },
    "hollow-pixel.svg": {
        "bg": "#1a0f0a",
        "accent": "#fbbf24",
        "fg": "#fde68a",
        "title": "HOLLOW PIXEL",
        "subtitle": "Precision platformer",
        "motif": "pixel",
    },
    "sundered-isles.svg": {
        "bg": "#0a1f2e",
        "accent": "#5eead4",
        "fg": "#cbd5e1",
        "title": "SUNDERED ISLES",
        "subtitle": "Procedural roguelike",
        "motif": "islands",
    },
    "lumen-queue.svg": {
        "bg": "#1e1b4b",
        "accent": "#fde047",
        "fg": "#e0e7ff",
        "title": "LUMEN QUEUE",
        "subtitle": "Puzzle prototype",
        "motif": "queue",
    },
    "bracken-hollow.svg": {
        "bg": "#14210b",
        "accent": "#a3e635",
        "fg": "#d9f99d",
        "title": "BRACKEN HOLLOW",
        "subtitle": "Tactics RPG",
        "motif": "grid",
    },
}


def thumb_svg(meta: dict) -> str:
    bg = meta["bg"]
    accent = meta["accent"]
    fg = meta["fg"]
    title = meta["title"]
    subtitle = meta["subtitle"]
    motif = meta["motif"]

    if motif == "speed":
        decoration = f"""
        <g stroke="{accent}" stroke-width="3" opacity="0.7" stroke-linecap="round">
          <line x1="80" y1="180" x2="280" y2="180"/>
          <line x1="120" y1="220" x2="340" y2="220"/>
          <line x1="60" y1="260" x2="240" y2="260"/>
          <line x1="160" y1="300" x2="380" y2="300"/>
        </g>
        <circle cx="600" cy="260" r="120" fill="none" stroke="{accent}" stroke-width="6" opacity="0.5"/>
        <circle cx="600" cy="260" r="80" fill="none" stroke="{fg}" stroke-width="2" opacity="0.4"/>
        """
    elif motif == "pixel":
        cells = []
        palette = [accent, fg, accent, fg + "55", accent + "88"]
        for r in range(8):
            for c in range(10):
                if (r * 7 + c * 3) % 5 == 0:
                    cells.append(
                        f'<rect x="{120 + c * 48}" y="{140 + r * 32}" width="44" height="28" fill="{palette[(r + c) % len(palette)]}"/>'
                    )
        decoration = "\n        ".join(cells)
    elif motif == "islands":
        decoration = f"""
        <g fill="none" stroke="{accent}" stroke-width="2" opacity="0.6">
          <path d="M 100 280 Q 200 240 320 280 Q 400 320 500 280"/>
          <path d="M 80 330 Q 220 290 360 330 Q 460 360 600 330"/>
          <path d="M 120 380 Q 240 340 380 380 Q 500 410 640 380"/>
        </g>
        <g fill="{accent}" opacity="0.8">
          <ellipse cx="220" cy="245" rx="40" ry="14"/>
          <ellipse cx="430" cy="225" rx="32" ry="11"/>
          <ellipse cx="540" cy="255" rx="50" ry="16"/>
        </g>
        """
    elif motif == "queue":
        decoration = f"""
        <g stroke="{accent}" stroke-width="3" fill="none">
          <rect x="120" y="180" width="80" height="140" rx="6"/>
          <rect x="220" y="180" width="80" height="140" rx="6"/>
          <rect x="320" y="180" width="80" height="140" rx="6"/>
          <rect x="420" y="180" width="80" height="140" rx="6"/>
          <rect x="520" y="180" width="80" height="140" rx="6"/>
        </g>
        <g fill="{accent}">
          <circle cx="160" cy="250" r="14"/>
          <circle cx="260" cy="250" r="14" opacity="0.7"/>
          <circle cx="360" cy="250" r="14" opacity="0.5"/>
          <circle cx="460" cy="250" r="14" opacity="0.3"/>
        </g>
        """
    elif motif == "grid":
        lines = []
        for i in range(9):
            x = 120 + i * 60
            lines.append(f'<line x1="{x}" y1="160" x2="{x}" y2="400" stroke="{accent}" stroke-width="1" opacity="0.3"/>')
        for i in range(5):
            y = 160 + i * 60
            lines.append(f'<line x1="120" y1="{y}" x2="600" y2="{y}" stroke="{accent}" stroke-width="1" opacity="0.3"/>')
        lines.append(f'<circle cx="300" cy="280" r="18" fill="{accent}"/>')
        lines.append(f'<circle cx="420" cy="220" r="18" fill="{fg}" opacity="0.7"/>')
        lines.append(f'<circle cx="480" cy="340" r="18" fill="{fg}" opacity="0.7"/>')
        lines.append(f'<circle cx="200" cy="340" r="18" fill="{accent}" opacity="0.5"/>')
        decoration = "\n        ".join(lines)
    else:
        decoration = ""

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="{title} thumbnail">
  <rect width="800" height="500" fill="{bg}"/>
  {decoration}
  <text x="60" y="440" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="34" font-weight="700" fill="{fg}" letter-spacing="2">{title}</text>
  <text x="62" y="470" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="{fg}" opacity="0.7">{subtitle}</text>
</svg>
"""


for name, meta in THUMBS.items():
    (PROJECTS_DIR / name).write_text(thumb_svg(meta))


# ---------- GIF / video placeholders ----------
# We cannot easily write a binary GIF in pure Python without PIL. Ship a
# note file instead. The media component will gracefully fall back to the
# thumbnail when the GIF fails to load — this is intentional, exercising
# the error fallback path.

gif_note = (
    "# This file is a placeholder for a real gameplay GIF.\n"
    "# Replace /public/projects/aether-drift.gif with a real GIF to see the\n"
    "# GIF player in action. The component will gracefully fall back to the\n"
    "# thumbnail while this placeholder is present.\n"
)
(PUBLIC / "projects" / "aether-drift.gif").write_text(gif_note)
(PUBLIC / "projects" / "bracken-hollow.gif").write_text(gif_note)

# Tiny invalid .mp4 stub so the video player's "source failed" path is exercised.
# Replace with a real clip to see the video player work.
(PUBLIC / "projects" / "sundered-isles.mp4").write_bytes(
    b"# placeholder for a real gameplay clip. Replace with a real .mp4.\n"
)


# ---------- tech-stack icons ----------

ICONS = {
    "unity.svg": '<path d="M24 6 L40 14 V34 L24 42 L8 34 V14 Z M24 14 L33 19 V29 L24 34 L15 29 V19 Z" fill="none" stroke="currentColor" stroke-width="2.5"/>',
    "godot.svg": '<path d="M12 14 Q24 8 36 14 V32 Q24 38 12 32 Z M18 20 V24 M30 20 V24 M16 30 Q24 34 32 30" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
    "csharp.svg": '<circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M20 18 V30 M16 22 L28 18 M16 26 L28 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    "gdscript.svg": '<path d="M16 12 H32 V36 H16 Z M16 18 H32 M16 24 H28 M16 30 H32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    "hlsl.svg": '<path d="M12 24 L24 12 L36 24 L24 36 Z M16 24 H32" fill="none" stroke="currentColor" stroke-width="2.5"/>',
    "burst.svg": '<path d="M24 8 V40 M8 24 H40 M12 12 L36 36 M36 12 L12 36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
    "compute.svg": '<rect x="10" y="10" width="28" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="10" y="20" width="28" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="10" y="30" width="28" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>',
    "git.svg": '<circle cx="14" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="34" cy="34" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="14" cy="34" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M14 18 V30 M16 14 H30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    "github-actions.svg": '<circle cx="24" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 36 V26 Q14 22 18 22 H30 Q34 22 34 26 V36" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 18 V22" stroke="currentColor" stroke-width="2"/>',
    "typescript.svg": '<rect x="8" y="8" width="32" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M14 22 H26 M20 22 V32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M28 30 Q28 26 32 26 Q36 26 36 30 Q36 34 32 34 Q28 34 28 30" fill="none" stroke="currentColor" stroke-width="2"/>',
    "react.svg": '<circle cx="24" cy="24" r="4" fill="currentColor"/><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(120 24 24)"/>',
    "nextjs.svg": '<circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M16 32 V16 L34 32 V16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
    "tailwind.svg": '<path d="M14 22 Q16 14 24 14 Q34 14 34 22 Q34 28 28 28 Q24 28 24 24 Q24 22 22 22 Q18 22 18 26 Q18 32 26 34 Q14 34 14 22 Z" fill="currentColor"/>',
    "steam.svg": '<circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="30" cy="20" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="2"/>',
    "itch.svg": '<path d="M12 16 Q24 12 36 16 L34 32 Q24 36 14 32 Z M18 22 V26 M30 22 V26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    "webgl.svg": '<path d="M12 14 L24 22 L36 14 V34 L24 26 L12 34 Z" fill="none" stroke="currentColor" stroke-width="2"/>',
}

for name, body in ICONS.items():
    (ICONS_DIR / name).write_text(
        f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="{name.replace('.svg','')} icon">
  {body}
</svg>
"""
    )


# ---------- favicon ----------
(PUBLIC / "favicon.svg").write_text(
    """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="favicon">
  <rect width="32" height="32" rx="6" fill="#0b1020"/>
  <path d="M8 22 L16 8 L24 22 Z" fill="none" stroke="#7dd3fc" stroke-width="2.5" stroke-linejoin="round"/>
</svg>
"""
)


# ---------- .nojekyll (empty file so GitHub Pages doesn't process _next/) ----------
(PUBLIC / ".nojekyll").write_text("")


print("All SVG/icon/placeholder assets generated.")
print(f"  thumbnails: {len(THUMBS)} -> {PROJECTS_DIR}")
print(f"  icons:      {len(ICONS)} -> {ICONS_DIR}")
print(f"  .nojekyll:  {PUBLIC / '.nojekyll'}")
