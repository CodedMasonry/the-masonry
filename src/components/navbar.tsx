"use client";

import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <div className="flex items-center p-2">
      <nav className="ml-4"></nav>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
