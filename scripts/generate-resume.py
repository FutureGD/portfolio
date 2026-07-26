#!/usr/bin/env python3
"""Regenerate the résumé PDF with NDA-safe, plain-language content.

Matches the original résumé's layout (header, professional summary,
experience, projects, education, skills) but replaces the specific
technical details in the Experience section with the same high-level,
non-technical description used on the portfolio site.

Output: /home/z/my-project/public/resume/resume.pdf
"""

from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
    ListFlowable,
    ListItem,
)

OUTPUT_PATH = Path("/home/z/my-project/public/resume/resume.pdf")
OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

# Use a clean sans-serif font. Carlito (installed at this path on most
# Linux distros) is metric-compatible with Calibri, which is what the
# original résumé used. Falls back to Helvetica if Carlito isn't found.
try:
    pdfmetrics.registerFont(TTFont("Body", "/usr/share/fonts/truetype/english/Carlito-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("BodyBold", "/usr/share/fonts/truetype/english/Carlito-Bold.ttf"))
    pdfmetrics.registerFont(TTFont("BodyItalic", "/usr/share/fonts/truetype/english/Carlito-Italic.ttf"))
    BODY_FONT = "Body"
    BODY_BOLD = "BodyBold"
    BODY_ITALIC = "BodyItalic"
except Exception:
    BODY_FONT = "Helvetica"
    BODY_BOLD = "Helvetica-Bold"
    BODY_ITALIC = "Helvetica-Oblique"

# ---------- Styles ----------
NAME_STYLE = ParagraphStyle(
    name="Name",
    fontName=BODY_BOLD,
    fontSize=20,
    leading=24,
    alignment=TA_CENTER,
    spaceAfter=2,
)
CONTACT_STYLE = ParagraphStyle(
    name="Contact",
    fontName=BODY_FONT,
    fontSize=9.5,
    leading=12,
    alignment=TA_CENTER,
    textColor="#444444",
    spaceAfter=2,
)
SECTION_HEADER_STYLE = ParagraphStyle(
    name="SectionHeader",
    fontName=BODY_BOLD,
    fontSize=11,
    leading=13,
    alignment=TA_LEFT,
    spaceBefore=8,
    spaceAfter=3,
    textColor="#000000",
)
JOB_TITLE_STYLE = ParagraphStyle(
    name="JobTitle",
    fontName=BODY_BOLD,
    fontSize=10.5,
    leading=12,
    alignment=TA_LEFT,
    spaceAfter=1,
)
ORG_STYLE = ParagraphStyle(
    name="Org",
    fontName=BODY_ITALIC,
    fontSize=9.5,
    leading=11,
    alignment=TA_LEFT,
    textColor="#444444",
    spaceAfter=2,
)
BULLET_STYLE = ParagraphStyle(
    name="Bullet",
    fontName=BODY_FONT,
    fontSize=9.5,
    leading=12,
    alignment=TA_LEFT,
    leftIndent=14,
    bulletIndent=2,
    spaceAfter=1,
)
SUMMARY_STYLE = ParagraphStyle(
    name="Summary",
    fontName=BODY_FONT,
    fontSize=9.5,
    leading=12,
    alignment=TA_LEFT,
    spaceAfter=3,
)
SKILL_STYLE = ParagraphStyle(
    name="Skill",
    fontName=BODY_FONT,
    fontSize=9.5,
    leading=12,
    alignment=TA_LEFT,
    leftIndent=10,
    spaceAfter=1,
)


def hr():
    return HRFlowable(
        width="100%",
        thickness=0.75,
        color="#888888",
        spaceBefore=2,
        spaceAfter=6,
    )


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(text, BULLET_STYLE), leftIndent=14) for text in items],
        bulletType="bullet",
        bulletFontName=BODY_FONT,
        bulletFontSize=8,
        leftIndent=12,
        spaceBefore=2,
        spaceAfter=4,
    )


def build():
    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        leftMargin=0.6 * inch,
        rightMargin=0.6 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
        title="Bhavishya Gupta — Resume",
        author="Bhavishya Gupta",
    )

    story = []

    # ---------- Header ----------
    story.append(Paragraph("Bhavishya Gupta", NAME_STYLE))
    story.append(Paragraph("Roorkee, Uttarakhand", CONTACT_STYLE))
    story.append(
        Paragraph(
            "+91 95080 61681 &nbsp;|&nbsp; futureji2025@gmail.com &nbsp;|&nbsp; "
            "linkedin.com/in/future-ji &nbsp;|&nbsp; github.com/FutureGD",
            CONTACT_STYLE,
        )
    )
    story.append(Spacer(1, 6))
    story.append(hr())

    # ---------- Professional Summary ----------
    story.append(Paragraph("PROFESSIONAL SUMMARY", SECTION_HEADER_STYLE))
    story.append(
        Paragraph(
            "Motivated B.Tech Computer Science student and aspiring Game Developer with "
            "practical indie studio experience in Unity (C#) and C++. Skilled in refactoring "
            "systems, debugging gameplay mechanics, and keeping codebases maintainable as a "
            "game grows.",
            SUMMARY_STYLE,
        )
    )

    # ---------- Experience ----------
    story.append(Paragraph("EXPERIENCE", SECTION_HEADER_STYLE))
    story.append(Paragraph("Unity Developer Intern", JOB_TITLE_STYLE))
    story.append(
        Paragraph(
            "Rural Games (Indie Game Studio) &nbsp;|&nbsp; Remote &nbsp;|&nbsp; July 2026 – Present",
            ORG_STYLE,
        )
    )
    story.append(
        bullets([
            "Working on gameplay scripting in Unity, helping keep the codebase clean as the game grows.",
            "Most of the work involves refactoring systems so the team can build on them more easily, "
            "and fixing bugs that come up during playtesting.",
        ])
    )

    # ---------- Personal Projects ----------
    story.append(Paragraph("PERSONAL PROJECTS", SECTION_HEADER_STYLE))

    story.append(Paragraph("Arena Survivor &nbsp;|&nbsp; Unity 6, C#, C++, Firebase", JOB_TITLE_STYLE))
    story.append(
        bullets([
            "Scalable multiplayer arena game for 4–8 players plus 20 AI bots, built with Unity 6, "
            "Netcode for GameObjects, Unity Gaming Services, and Firebase.",
            "Includes a C++ native A* pathfinding plugin integrated into Unity via DllImport that is "
            "roughly 2x faster than the equivalent C# implementation.",
        ])
    )

    story.append(Paragraph("Obstacle Avoidance Game (Endless Runner) &nbsp;|&nbsp; Unity, C#", JOB_TITLE_STYLE))
    story.append(
        bullets([
            "Developed a 3D endless runner where the player navigates a vehicle through oncoming "
            "traffic, focusing on smooth player controls and reactive collision detection.",
            "Implemented a dynamic object spawning system to continuously generate obstacles, testing "
            "and refining the difficulty curve for player engagement.",
        ])
    )

    story.append(Paragraph("Cube Runner &amp; Snake Game &nbsp;|&nbsp; Unity, C#", JOB_TITLE_STYLE))
    story.append(
        bullets([
            "Built core gameplay loops for 2D and 3D prototypes, handling player input, score tracking, "
            "and game-over states.",
            "Gained hands-on experience with Unity's physics engine, rigidbodies, and basic UI "
            "integration for menus and point displays.",
        ])
    )

    story.append(Paragraph("Brick Breaker &amp; Pong &nbsp;|&nbsp; Unity, C#", JOB_TITLE_STYLE))
    story.append(
        bullets([
            "Two entries in a warm-up project series — classic brick-breaker and Pong built from "
            "scratch to practice core Unity patterns: collisions, paddle physics, ball physics, score "
            "tracking, and level progression.",
        ])
    )

    story.append(Paragraph("Alien Shooter &nbsp;|&nbsp; Unity, C#", JOB_TITLE_STYLE))
    story.append(
        bullets([
            "Early-stage 2D platformer prototype — exploring 2D level design, enemy AI, and platformer "
            "character controllers in Unity.",
        ])
    )

    # ---------- Education ----------
    story.append(Paragraph("EDUCATION", SECTION_HEADER_STYLE))
    story.append(Paragraph("B.Tech in Computer Science and Engineering", JOB_TITLE_STYLE))
    story.append(
        Paragraph(
            "Haridwar University (Roorkee College of Engineering), Roorkee, Uttarakhand",
            ORG_STYLE,
        )
    )
    story.append(
        Paragraph(
            "Expected Graduation: 2027 &nbsp;|&nbsp; Aggregate: 78%",
            ORG_STYLE,
        )
    )
    story.append(
        bullets([
            "Relevant Coursework: Object-Oriented Programming, Data Structures &amp; Algorithms, "
            "Operating Systems, Database Management Systems, Computer Networks.",
        ])
    )

    # ---------- Skills ----------
    story.append(Paragraph("SKILLS", SECTION_HEADER_STYLE))
    story.append(Paragraph("•&nbsp; Programming: C# (Unity), C++, Python", SKILL_STYLE))
    story.append(Paragraph("•&nbsp; Game Engine: Unity", SKILL_STYLE))
    story.append(Paragraph("•&nbsp; Multiplayer &amp; Backend: Netcode for GameObjects, Unity Gaming Services, Firebase", SKILL_STYLE))
    story.append(Paragraph("•&nbsp; Version Control &amp; DevOps: Git, GitHub, GitHub Actions", SKILL_STYLE))
    story.append(Paragraph("•&nbsp; Design Tools: Blender (Basic Fundamentals)", SKILL_STYLE))

    doc.build(story)
    print(f"  ✓ Wrote {OUTPUT_PATH} ({OUTPUT_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    build()
