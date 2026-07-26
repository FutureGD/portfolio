"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Code2, ExternalLink, FileText } from "lucide-react";
import type { Project } from "@/data/types";
import { NoMedia, ProjectMedia } from "./project-media";
import { statusLabel, statusVariant } from "./project-status";

export function ProjectCard({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (p: Project) => void;
}) {
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-4 pb-0">
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
      </div>

      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{project.category}</Badge>
          <Badge variant={statusVariant(project.status)}>
            {statusLabel(project.status)}
          </Badge>
        </div>
        <h3 className="mt-2 text-xl font-bold leading-tight">{project.title}</h3>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="outline" className="font-mono text-xs">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {hasCaseStudy && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onViewDetails(project)}
            >
              <FileText className="mr-1.5 h-4 w-4" aria-hidden />
              View details
            </Button>
          )}
          {project.codeUrl && (
            <Button asChild variant="ghost" size="sm">
              <a href={project.codeUrl} target="_blank" rel="noreferrer noopener">
                <Code2 className="mr-1.5 h-4 w-4" aria-hidden />
                Source
                <ExternalLink className="ml-1 h-3 w-3" aria-hidden />
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button asChild variant="ghost" size="sm">
              <a href={project.demoUrl} target="_blank" rel="noreferrer noopener">
                Play demo
                <ExternalLink className="ml-1 h-3 w-3" aria-hidden />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
