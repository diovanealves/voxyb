"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="outline"
      size="icon"
    >
      {theme === "light" ? <Icons.sun /> : <Icons.moon />}
    </Button>
  );
}
