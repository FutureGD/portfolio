#!/usr/bin/env python3
"""Generate SVG thumbnails for the 6 real projects + 9 new tech-stack icons.

Projects:
  - arena-survivor.svg      (multiplayer arena, A* pathfinding)
  - obstacle-avoidance.svg   (3D endless runner)
  - cube-runner-snake.svg    (2D/3D prototypes)
  - brick-breaker.svg        (classic brick breaker)
  - pong.svg                 (classic pong)
  - alien-shooter.svg        (2D platformer prototype)

Tech-stack icons (48x48 monochrome, uses currentColor):
  - cpp.svg
  - python.svg
  - navmesh.svg
  - physics.svg
  - events.svg
  - gizmos.svg
  - ngo.svg
  - ugs.svg
  - firebase.svg
  - native-plugin.svg
  - astar.svg
  - dsa.svg
  - oop.svg
  - blender.svg
"""

from pathlib import Path

PUBLIC = Path("/home/z/my-project/public")
PROJECTS_DIR = PUBLIC / "projects"
ICONS_DIR = PUBLIC / "icons"

# ---------- project thumbnails ----------

THUMBS = {
    "arena-survivor.svg": {
        "bg": "#0a0e1a",
        "accent": "#f97316",
        "accent2": "#22d3ee",
        "fg": "#e2e8f0",
        "title": "ARENA SURVIVOR",
        "subtitle": "Multiplayer · Unity 6 · C++ AI",
        "motif": "arena",
    },
    "obstacle-avoidance.svg": {
        "bg": "#0b1020",
        "accent": "#fbbf24",
        "accent2": "#ef4444",
        "fg": "#e2e8f0",
        "title": "OBSTACLE AVOIDANCE",
        "subtitle": "3D Endless Runner",
        "motif": "road",
    },
    "cube-runner-snake.svg": {
        "bg": "#1a0f0a",
        "accent": "#a3e635",
        "accent2": "#84cc16",
        "fg": "#fde68a",
        "title": "CUBE RUNNER & SNAKE",
        "subtitle": "2D / 3D Prototypes",
        "motif": "blocks",
    },
    "brick-breaker.svg": {
        "bg": "#1e1b4b",
        "accent": "#fde047",
        "accent2": "#f59e0b",
        "fg": "#e0e7ff",
        "title": "BRICK BREAKER",
        "subtitle": "Classic / Prototype",
        "motif": "bricks",
    },
    "pong.svg": {
        "bg": "#0a1f2e",
        "accent": "#5eead4",
        "accent2": "#ffffff",
        "fg": "#cbd5e1",
        "title": "PONG",
        "subtitle": "Classic / Prototype",
        "motif": "pong",
    },
    "alien-shooter.svg": {
        "bg": "#14210b",
        "accent": "#a3e635",
        "accent2": "#22c55e",
        "fg": "#d9f99d",
        "title": "ALIEN SHOOTER",
        "subtitle": "2D Platformer · Prototype",
        "motif": "alien",
    },
}


def thumb_svg(meta: dict) -> str:
    bg = meta["bg"]
    accent = meta["accent"]
    accent2 = meta.get("accent2", accent)
    fg = meta["fg"]
    title = meta["title"]
    subtitle = meta["subtitle"]
    motif = meta["motif"]

    if motif == "arena":
        # Top-down arena with player + AI path lines
        decoration = f"""
        <circle cx="400" cy="260" r="160" fill="none" stroke="{accent}" stroke-width="2" opacity="0.3"/>
        <circle cx="400" cy="260" r="100" fill="none" stroke="{accent}" stroke-width="1" opacity="0.2"/>
        <circle cx="400" cy="260" r="40" fill="none" stroke="{accent}" stroke-width="1" opacity="0.15"/>
        <!-- player dot -->
        <circle cx="400" cy="260" r="10" fill="{accent}"/>
        <!-- AI bots -->
        <circle cx="280" cy="180" r="8" fill="{accent2}" opacity="0.85"/>
        <circle cx="520" cy="180" r="8" fill="{accent2}" opacity="0.85"/>
        <circle cx="280" cy="340" r="8" fill="{accent2}" opacity="0.85"/>
        <circle cx="520" cy="340" r="8" fill="{accent2}" opacity="0.85"/>
        <circle cx="200" cy="260" r="8" fill="{accent2}" opacity="0.85"/>
        <circle cx="600" cy="260" r="8" fill="{accent2}" opacity="0.85"/>
        <!-- path lines from one bot -->
        <path d="M 280 180 L 320 220 L 360 240 L 400 260" stroke="{accent2}" stroke-width="1.5" stroke-dasharray="4 4" fill="none" opacity="0.6"/>
        """
    elif motif == "road":
        # 3D road perspective with obstacles
        decoration = f"""
        <polygon points="280,500 520,500 460,180 340,180" fill="{accent}" opacity="0.15"/>
        <polygon points="280,500 520,500 460,180 340,180" fill="none" stroke="{accent}" stroke-width="2" opacity="0.4"/>
        <line x1="400" y1="500" x2="400" y2="180" stroke="{accent2}" stroke-width="2" stroke-dasharray="20 20" opacity="0.5"/>
        <!-- obstacles (other vehicles) -->
        <rect x="350" y="280" width="40" height="60" rx="4" fill="{accent2}" opacity="0.85"/>
        <rect x="410" y="340" width="40" height="60" rx="4" fill="{accent2}" opacity="0.7"/>
        <rect x="370" y="400" width="40" height="60" rx="4" fill="{accent2}" opacity="0.55"/>
        <!-- player car -->
        <rect x="385" y="430" width="30" height="50" rx="4" fill="{accent}"/>
        """
    elif motif == "blocks":
        # Cube runner + snake dual motif
        decoration = f"""
        <g opacity="0.85">
          <!-- cube (3D) -->
          <g transform="translate(180,200)">
            <polygon points="0,40 40,60 80,40 40,20" fill="{accent}" opacity="0.8"/>
            <polygon points="0,40 0,90 40,110 40,60" fill="{accent}" opacity="0.6"/>
            <polygon points="80,40 80,90 40,110 40,60" fill="{accent}" opacity="0.7"/>
          </g>
          <!-- snake -->
          <g transform="translate(380,260)">
            <rect x="0" y="0" width="20" height="20" fill="{accent2}" rx="3"/>
            <rect x="24" y="0" width="20" height="20" fill="{accent2}" rx="3" opacity="0.85"/>
            <rect x="48" y="0" width="20" height="20" fill="{accent2}" rx="3" opacity="0.7"/>
            <rect x="48" y="24" width="20" height="20" fill="{accent2}" rx="3" opacity="0.6"/>
            <rect x="48" y="48" width="20" height="20" fill="{accent2}" rx="3" opacity="0.5"/>
            <rect x="72" y="48" width="20" height="20" fill="{accent2}" rx="3" opacity="0.4"/>
            <circle cx="120" cy="58" r="12" fill="{accent2}"/>
          </g>
        </g>
        """
    elif motif == "bricks":
        # Brick wall with ball + paddle
        decoration = f"""
        <g fill="{accent}" opacity="0.85">
          <rect x="180" y="180" width="60" height="24" rx="2"/>
          <rect x="246" y="180" width="60" height="24" rx="2"/>
          <rect x="312" y="180" width="60" height="24" rx="2"/>
          <rect x="378" y="180" width="60" height="24" rx="2"/>
          <rect x="444" y="180" width="60" height="24" rx="2"/>
          <rect x="210" y="210" width="60" height="24" rx="2" opacity="0.7"/>
          <rect x="276" y="210" width="60" height="24" rx="2" opacity="0.7"/>
          <rect x="342" y="210" width="60" height="24" rx="2" opacity="0.7"/>
          <rect x="408" y="210" width="60" height="24" rx="2" opacity="0.7"/>
          <rect x="474" y="210" width="60" height="24" rx="2" opacity="0.7"/>
          <rect x="180" y="240" width="60" height="24" rx="2" opacity="0.5"/>
          <rect x="246" y="240" width="60" height="24" rx="2" opacity="0.5"/>
          <rect x="312" y="240" width="60" height="24" rx="2" opacity="0.5"/>
        </g>
        <!-- ball -->
        <circle cx="400" cy="340" r="10" fill="{accent2}"/>
        <!-- paddle -->
        <rect x="350" y="400" width="100" height="14" rx="4" fill="{accent2}"/>
        """
    elif motif == "pong":
        # Pong field with paddles + ball + dashed center line
        decoration = f"""
        <line x1="400" y1="160" x2="400" y2="380" stroke="{accent2}" stroke-width="2" stroke-dasharray="8 12" opacity="0.5"/>
        <rect x="180" y="230" width="12" height="80" fill="{accent}"/>
        <rect x="608" y="230" width="12" height="80" fill="{accent}"/>
        <circle cx="400" cy="280" r="10" fill="{accent2}"/>
        <circle cx="400" cy="280" r="20" fill="none" stroke="{accent2}" stroke-width="1" opacity="0.4"/>
        """
    elif motif == "alien":
        # 2D platformer: ground + alien silhouette + player
        decoration = f"""
        <rect x="0" y="380" width="800" height="40" fill="{accent}" opacity="0.25"/>
        <rect x="0" y="378" width="800" height="3" fill="{accent}" opacity="0.6"/>
        <!-- alien -->
        <g transform="translate(520,280)">
          <ellipse cx="0" cy="40" rx="30" ry="14" fill="{accent2}" opacity="0.7"/>
          <ellipse cx="0" cy="20" rx="22" ry="22" fill="{accent2}"/>
          <circle cx="-8" cy="14" r="4" fill="{bg}"/>
          <circle cx="8" cy="14" r="4" fill="{bg}"/>
          <line x1="-22" y1="20" x2="-32" y2="10" stroke="{accent2}" stroke-width="3" stroke-linecap="round"/>
          <line x1="22" y1="20" x2="32" y2="10" stroke="{accent2}" stroke-width="3" stroke-linecap="round"/>
        </g>
        <!-- player (square character) -->
        <rect x="250" y="340" width="30" height="40" fill="{accent}" rx="3"/>
        <!-- bullet -->
        <circle cx="320" cy="360" r="4" fill="{accent2}"/>
        <line x1="290" y1="360" x2="320" y2="360" stroke="{accent2}" stroke-width="2" opacity="0.4"/>
        """
    else:
        decoration = ""

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="{title} thumbnail">
  <rect width="800" height="500" fill="{bg}"/>
  {decoration}
  <text x="60" y="450" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="30" font-weight="700" fill="{fg}" letter-spacing="2">{title}</text>
  <text x="62" y="478" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="{fg}" opacity="0.65">{subtitle}</text>
</svg>
"""


for name, meta in THUMBS.items():
    (PROJECTS_DIR / name).write_text(thumb_svg(meta))


# ---------- tech-stack icons ----------

ICONS = {
    "cpp.svg": '<text x="24" y="32" font-family="ui-monospace, monospace" font-size="20" font-weight="700" fill="currentColor" text-anchor="middle">C++</text>',
    "python.svg": '<path d="M16 30 Q16 18 24 18 H32 Q40 18 40 26 V32 H28 M24 14 Q24 8 32 8 H40 M16 30 H28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="20" cy="13" r="2" fill="currentColor"/><circle cx="36" cy="35" r="2" fill="currentColor"/>',
    "navmesh.svg": '<polygon points="10,38 10,16 24,10 38,16 38,38 24,42" fill="none" stroke="currentColor" stroke-width="2"/><line x1="10" y1="22" x2="38" y2="22" stroke="currentColor" stroke-width="1" opacity="0.5"/><line x1="24" y1="10" x2="24" y2="42" stroke="currentColor" stroke-width="1" opacity="0.5"/>',
    "physics.svg": '<circle cx="24" cy="24" r="6" fill="currentColor"/><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(120 24 24)"/>',
    "events.svg": '<path d="M14 14 L34 24 L14 34 Z" fill="currentColor"/><line x1="10" y1="14" x2="10" y2="34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
    "gizmos.svg": '<line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" stroke-width="2.5"/><line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="2.5"/><polygon points="24,4 21,9 27,9" fill="currentColor"/><polygon points="24,44 21,39 27,39" fill="currentColor"/><polygon points="4,24 9,21 9,27" fill="currentColor"/><polygon points="44,24 39,21 39,27" fill="currentColor"/>',
    "ngo.svg": '<circle cx="14" cy="14" r="4" fill="currentColor"/><circle cx="34" cy="34" r="4" fill="currentColor"/><line x1="14" y1="14" x2="34" y2="34" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="2"/>',
    "ugs.svg": '<path d="M24 8 L40 16 V32 L24 40 L8 32 V16 Z" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="24" r="4" fill="currentColor"/>',
    "firebase.svg": '<path d="M14 38 L24 8 L34 38 L24 32 Z" fill="currentColor" opacity="0.4"/><path d="M14 38 L24 8 L24 32 Z" fill="currentColor"/><path d="M14 38 L24 32 L34 38 Z" fill="currentColor" opacity="0.7"/>',
    "native-plugin.svg": '<rect x="8" y="20" width="14" height="10" rx="1" fill="currentColor" opacity="0.4"/><rect x="26" y="20" width="14" height="10" rx="1" fill="currentColor"/><line x1="22" y1="25" x2="26" y2="25" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/><line x1="12" y1="14" x2="12" y2="20" stroke="currentColor" stroke-width="1.5"/><circle cx="36" cy="12" r="2" fill="currentColor"/><line x1="36" y1="14" x2="36" y2="20" stroke="currentColor" stroke-width="1.5"/>',
    "astar.svg": '<circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="36" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="36" r="3" fill="currentColor"/><circle cx="36" cy="36" r="3" fill="currentColor"/><circle cx="24" cy="24" r="3" fill="currentColor"/><line x1="12" y1="12" x2="24" y2="24" stroke="currentColor" stroke-width="2"/><line x1="24" y1="24" x2="36" y2="36" stroke="currentColor" stroke-width="2"/><text x="24" y="42" font-family="ui-monospace, monospace" font-size="9" font-weight="700" fill="currentColor" text-anchor="middle">A*</text>',
    "dsa.svg": '<rect x="8" y="8" width="14" height="10" rx="1" fill="currentColor"/><rect x="26" y="8" width="14" height="10" rx="1" fill="currentColor" opacity="0.6"/><rect x="8" y="22" width="14" height="10" rx="1" fill="currentColor" opacity="0.6"/><rect x="26" y="22" width="14" height="10" rx="1" fill="currentColor" opacity="0.4"/><rect x="17" y="36" width="14" height="6" rx="1" fill="currentColor" opacity="0.8"/>',
    "oop.svg": '<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="currentColor"/><line x1="24" y1="10" x2="24" y2="21" stroke="currentColor" stroke-width="2"/><line x1="38" y1="24" x2="27" y2="24" stroke="currentColor" stroke-width="2"/>',
    "blender.svg": '<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="28" r="4" fill="currentColor"/><line x1="24" y1="10" x2="24" y2="20" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="10" r="2" fill="currentColor"/>',
}

for name, body in ICONS.items():
    (ICONS_DIR / name).write_text(
        f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="{name.replace('.svg','')} icon">
  {body}
</svg>
"""
    )

print(f"Generated {len(THUMBS)} project thumbnails + {len(ICONS)} tech-stack icons")
print(f"  thumbnails -> {PROJECTS_DIR}")
print(f"  icons      -> {ICONS_DIR}")
