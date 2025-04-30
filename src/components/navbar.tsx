"use client";

import { ModeToggle } from "./mode-toggle";
import { NavbarMenu } from "./navbarRouting";
import React from "react";
import { ProfessionalSection } from "~/lib/routing";

export function Navbar() {
  return (
    <div className="absolute flex w-full items-center p-2">
      <div className="ml-4">
        <NavbarMenu components={ProfessionalSection} />
      </div>
      <div className="ml-auto mr-2 flex">
        <ModeToggle />
      </div>
    </div>
  );
}
