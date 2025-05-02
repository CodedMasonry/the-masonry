"use client";

import React from "react";
import { ProfessionalSection } from "~/lib/routing";
import { ModeToggle } from "./mode-toggle";
import { NavbarMenu } from "./navbarRouting";

export function Navbar() {
	return (
		<div className="absolute flex w-full items-center p-2">
			<div className="ml-4">
				<NavbarMenu components={ProfessionalSection} />
			</div>
			<div className="mr-2 ml-auto flex">
				<ModeToggle />
			</div>
		</div>
	);
}
