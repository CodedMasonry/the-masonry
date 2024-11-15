"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <div className="p-2 bg-background shadow-lg">
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </div>
  );
}
