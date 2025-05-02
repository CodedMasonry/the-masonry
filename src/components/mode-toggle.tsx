"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";

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
			<IconSun className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
			<IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
