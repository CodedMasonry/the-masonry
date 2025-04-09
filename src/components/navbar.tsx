"use client";

import { useIsMobile } from "~/hooks/use-mobile";
import { ModeToggle } from "./mode-toggle";
import { NavbarMenu } from "./navbarRouting";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { type Icon, IconMenu2 } from "@tabler/icons-react";
import React from "react";
import { ProfessionalSection } from "~/lib/routing";

export function Navbar() {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="absolute flex w-full items-center p-2">
      <div className="ml-4">
        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <IconMenu2 />
          </Button>
        ) : (
          <NavbarMenu components={ProfessionalSection} />
        )}
      </div>
      <div className="ml-auto mr-2 flex">
        <ModeToggle />
      </div>
    </div>
  );
}
