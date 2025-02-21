"use client";

import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export function Navbar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="absolute flex w-full items-center p-2">
      <nav className="ml-4">
        {path != "/" && (
          <Button onClick={() => router.back()} variant="ghost">
            <IconArrowLeft /> Back
          </Button>
        )}
      </nav>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
