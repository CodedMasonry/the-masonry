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
      <p className="">Mentored with Marcus Larger, Justin Holderby</p>
      <p className="font-light italic">April 15 - May 9, 2025</p>
    </div>
  );
}

function Body() {
  return (
    <>
      <div className="mx-8 mt-8 flex flex-col">
        <p className="max-w-6xl">
          My high school has a program called the Young Professionals Academy
          (YPA). The program gives students opportunities to partake in two
          internships. For my second, I spent 4-weeks with Outcomes. They are a
          tech company focused on pharmacy-centered software. My main mentors
          were Marcus Larger & Justin Holderby, but I also worked closely with
          several others within and outside of his team. It was an immensely
          valuable experience, seeing how my existing skills & knowledge
          transfer to software engineering in a business environment. Alongside
          that, I got insight into the business side of software, and the role
          of leadership.
        </p>
        <div className="relative my-2 aspect-video w-2xl">
          <Image
            src="/images/agile.png"
            alt="Diagram of agile"
            className="rounded"
            fill
          />
        </div>
      </div>
    </>
  );
}
