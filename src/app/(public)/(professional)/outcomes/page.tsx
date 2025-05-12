import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <Body />
    </div>
  );
}

function Header() {
  return (
    <div className="mx-8 mt-16 flex flex-col space-y-1">
      <h1 className="font-semibold text-4xl underline decoration-primary">
        Software Engineering Internship
      </h1>
      <Link href="https://fstlogistics.com/" className="w-fit hover:underline">
        <h2 className="text-2xl">Outcomes</h2>
      </Link>
      <p className="">Mentored with Marcus Larger</p>
      <p className="font-light italic">April 15 - May 9, 2025</p>
    </div>
  );
}

function Body() {
  return (
    <>
      <div className="mx-8 mt-8 flex flex-col md:flex-row"></div>
    </>
  );
}
