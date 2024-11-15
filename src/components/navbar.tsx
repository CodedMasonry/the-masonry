"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { buttonVariants } from "~/components/ui/button";

export function Navbar() {
  return (
    <div className="flex items-center p-2">
      <nav className="ml-4">
      </nav>
      <div className="ml-auto mr-4">
        <ModeToggle />
      </div>
    </div>
  );
}
