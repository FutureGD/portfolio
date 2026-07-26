"use client";

import Image from "next/image";
import { Wrench } from "lucide-react";
import { techstack } from "@/data/techstack";
import { withBasePath } from "@/lib/asset";

export function TechStack() {
  const isEmpty = techstack.length === 0;

  return (
    <section
      id="tech-stack"
      className="border-y border-border bg-muted/30"
      aria-label="Tech Stack"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <header className="mb-8 flex items-baseline gap-3">
          <span className="font-mono text-sm text-muted-foreground">04</span>
          <h2 className="text-3xl font-bold tracking-tight">Tech Stack</h2>
        </header>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background py-16 text-center">
            <Wrench className="mb-3 h-10 w-10 text-muted-foreground" aria-hidden />
            <p className="text-base font-medium">Nothing here yet.</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Tools will appear here once there&apos;s real experience to back
              each entry. Add a category to{" "}
              <code className="font-mono text-foreground">src/data/techstack.ts</code>{" "}
              and it will render with its items.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {techstack.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                    >
                      {/*
                        Icon box: constant light background in BOTH light
                        and dark themes. This is the key fix — brand colors
                        that would be invisible on a dark background
                        (GitHub #181717 black, Unity #4D4D4D dark gray)
                        always render against the same light backdrop, so
                        every icon is clearly visible regardless of theme.

                        `bg-white` is forced via Tailwind's `!` modifier
                        so dark-mode CSS variables don't override it.
                      */}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border !bg-white">
                        <Image
                          src={withBasePath(item.iconPath)}
                          alt=""
                          width={20}
                          height={20}
                          unoptimized
                          className="h-5 w-5"
                        />
                      </span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
