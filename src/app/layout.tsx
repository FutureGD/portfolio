import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/asset";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Honest metadata — only claims content, sections, or skills that
 * actually appear on the page.
 *
 * The page renders: About (bio), Education & Experience (B.Tech at
 * Haridwar University, Unity Developer Intern at Rural Games, school),
 * Projects (6 real projects from GitHub + résumé), Tech Stack (real
 * skills from résumé), Contact (email/GitHub/LinkedIn), and a working
 * résumé download button.
 */
const description = `${profile.tagline} based in ${profile.location}. B.Tech CS student at Haridwar University and Unity Developer Intern at Rural Games. Builds games in Unity (C#) and C++.`;

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.tagline}`,
  description,
  keywords: [
    profile.name,
    profile.displayName,
    "FutureGD",
    "game developer",
    "gameplay programmer",
    "Unity",
    "C#",
    "C++",
    "Unity NavMesh",
    "Unity Physics",
    "Unity Events",
    "Custom Gizmos",
    "Netcode for GameObjects",
    "Unity Gaming Services",
    "Firebase",
    "A* pathfinding",
    "Roorkee",
    "Haridwar University",
    "Rural Games",
    "portfolio",
  ].filter(Boolean) as string[],
  authors: [{ name: profile.name }],
  icons: {
    // `metadata.icons` paths are not auto-prefixed with `basePath` in
    // Next.js 16, so we run them through `withBasePath()` manually.
    // Without this, the favicon silently 404s under GitHub Pages.
    icon: withBasePath("/favicon.svg"),
  },
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description,
    ...(profile.siteUrl ? { url: profile.siteUrl } : {}),
    siteName: `${profile.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Portfolio`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
