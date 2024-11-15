"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

import { Button } from "~/components/ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button className="from-transparent to-background">
      <Moon />
      Dark Theme
    </Button>
  );
}
