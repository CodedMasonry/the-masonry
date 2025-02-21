"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

function extractPathParts(path: string): {
  basePath: string;
  capitalized: string;
} {
  const parts = path.split("/").filter(Boolean); // Remove empty strings from split parts
  if (parts.length === 0) {
    return { basePath: "", capitalized: "" };
  }

  const basePath = "/" + parts[0]; // Get the first segment and prepend "/"
  const capitalized = parts[0]!.charAt(0).toUpperCase() + parts[0]!.slice(1); // Capitalize first letter

  return { basePath, capitalized };
}

export function Navbar() {
  const path = usePathname();

  // Gets the previous URL excluding the most recent.
  // ex: /photos/ID -> /photos
  const parts = extractPathParts(path);
  // If the URL at it's lowest is right above main
  if (parts.basePath == path) {
    parts.basePath = "/";
    parts.capitalized = "Home";
  }

  return (
    <div className="absolute flex w-full items-center p-2">
      <nav className="ml-4">
        {path != "/" && (
          <Link href={parts.basePath}>
            <Button variant="ghost">
              <IconArrowLeft /> {parts.capitalized}
            </Button>
          </Link>
        )}
      </nav>
      <div className="ml-auto mr-2">
        <ModeToggle />
      </div>
    </div>
  );
}
