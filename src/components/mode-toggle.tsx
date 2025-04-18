"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  function flipTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={flipTheme}>
      <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
