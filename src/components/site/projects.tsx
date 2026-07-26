"use client";

import { useMemo, useState } from "react";
import { FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { ProjectCard } from "./project-card";
import { ProjectDetailsDialog } from "./project-details-dialog";

type SortKey = "default" | "status" | "title";

const STATUS_ORDER: Record<Project["status"], number> = {
  "in-progress": 0,
  completed: 1,
  prototype: 2,
};

export function Projects() {
  const [sort, setSort] = useState<SortKey>("default");
  const [active, setActive] = useState<Project | null>(null);

  // Render order = array order unless an override is selected. This is
  // the "reordering = reordering the array" contract from the spec.
  const projectsList = useMemo(() => {
    const list = [...projects];
    if (sort === "status") {
      list.sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
    } else if (sort === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [sort]);

  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      aria-label="Projects"
    >
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-muted-foreground">03</span>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        </div>
        {projectsList.length > 0 && (
          <div className="flex items-center gap-1" role="group" aria-label="Sort projects">
            <SortButton active={sort === "default"} onClick={() => setSort("default")}>
              Default
            </SortButton>
            <SortButton active={sort === "status"} onClick={() => setSort("status")}>
              By status
            </SortButton>
            <SortButton active={sort === "title"} onClick={() => setSort("title")}>
              A–Z
            </SortButton>
          </div>
        )}
      </header>

      {projectsList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsList.map((p) => (
            <ProjectCard key={p.id} project={p} onViewDetails={setActive} />
          ))}
        </div>
      )}

      <ProjectDetailsDialog
        project={active}
        open={active !== null}
        onOpenChange={(v) => !v && setActive(null)}
      />
    </section>
  );
}

function SortButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size="sm"
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </Button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-16 text-center">
      <FolderGit2 className="mb-3 h-10 w-10 text-muted-foreground" aria-hidden />
      <p className="text-base font-medium">Nothing here yet.</p>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Real projects will appear here once they exist. Add an object to{" "}
        <code className="font-mono text-foreground">src/data/projects.ts</code>{" "}
        and it will render in array order — no component code needs to change.
      </p>
    </div>
  );
}
