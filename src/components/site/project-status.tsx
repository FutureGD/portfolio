import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";
import type { ProjectStatus } from "@/data/types";

/**
 * The variant prop type accepted by shadcn's `Badge`. Derived from the
 * `badgeVariants` cva definition so it stays in sync if the variants
 * ever change.
 */
type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

/**
 * Centralized status -> badge-variant mapping. Keeps the rendering rule
 * in one place so every consumer (card, dialog, future sort control)
 * stays consistent.
 */
export function statusVariant(status: ProjectStatus): BadgeVariant {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "prototype":
      return "outline";
  }
}

export function statusLabel(status: ProjectStatus): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In progress";
    case "prototype":
      return "Prototype";
  }
}
