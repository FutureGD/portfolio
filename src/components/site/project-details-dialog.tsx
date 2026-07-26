"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/data/types";
import { ProjectMedia, NoMedia } from "./project-media";
import { statusVariant, statusLabel } from "./project-status";

export function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!project) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Case study and details for {project.title}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant={statusVariant(project.status)}>
              {statusLabel(project.status)}
            </Badge>
          </div>

          <p className="text-base text-foreground/90">{project.description}</p>

          {project.media ? (
            <ProjectMedia
              key={project.media.src}
              media={project.media}
              thumbnail={project.thumbnail}
              title={project.title}
            />
          ) : (
            <NoMedia thumbnail={project.thumbnail} title={project.title} />
          )}

          <div>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Tech
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline">{t}</Badge>
              ))}
            </div>
          </div>

          {project.caseStudy && (
            <div className="space-y-4 border-t border-border pt-4">
              <CaseStudyBlock label="Problem" body={project.caseStudy.problem} />
              <CaseStudyBlock label="Approach" body={project.caseStudy.approach} />
              <CaseStudyBlock label="Challenge" body={project.caseStudy.challenge} />
              <CaseStudyBlock label="Outcome" body={project.caseStudy.outcome} />
            </div>
          )}

          <div className="flex flex-wrap gap-3 border-t border-border pt-4">
            {project.codeUrl && (
              <Button asChild variant="outline" size="sm">
                <a href={project.codeUrl} target="_blank" rel="noreferrer noopener">
                  <Code2 className="mr-2 h-4 w-4" aria-hidden />
                  View source
                  <ExternalLink className="ml-1 h-3 w-3" aria-hidden />
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild size="sm">
                <a href={project.demoUrl} target="_blank" rel="noreferrer noopener">
                  Play demo
                  <ExternalLink className="ml-1 h-3 w-3" aria-hidden />
                </a>
              </Button>
            )}
            {!project.codeUrl && !project.demoUrl && (
              <p className="text-sm text-muted-foreground">
                No public source or demo for this project yet.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CaseStudyBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h3 className="mb-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </h3>
      <p className="text-sm leading-relaxed">{body}</p>
    </div>
  );
}
