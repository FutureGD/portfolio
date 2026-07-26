"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration-safety pattern: render a stable placeholder on the server,
  // then sync to the real theme after mount. The lint rule discourages
  // calling setState inside an effect, but this is the canonical
  // workaround for next-themes' SSR mismatch — there is no external
  // system to subscribe to, and the value we want to read is only
  // available after mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" aria-hidden />
      )}
    </Button>
  );
}
