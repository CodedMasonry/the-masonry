import Footer from "~/components/footer";
import { Navbar } from "~/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

// Dublin green: #006853
export default async function Page() {
  return (
    <main className="flex flex-col">
      <Navbar />

      <Header />
      <About />
      <AboutNarrative />

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <div className="ml-4 mr-4 mt-16 flex flex-col md:ml-8">
      <Image
        src="/icons/dcs.png"
        width={128}
        height={112}
        alt="Dublin City School's Logo"
        className="aspect-auto"
      />
      <h1 className="text-5xl font-bold text-[#006853]">
        Young Professionals Academy
      </h1>
      <div className="mt-2 grid max-w-4xl grid-cols-6">
        <p className="italic">Spring, 2025</p>
        <p className="italic">Dublin City Schools</p>
      </div>
      <p className="mt-2 max-w-4xl text-lg">
        During my junior year in highschool I tried taking a program called IT
        Academy. I decided halfway through the semester to drop the class
        because I knew the contents of the class, and decided to pick up Young
        Professionals Academy for my second semester. It was one of the greatest
        decisions I have made.
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="ml-4 mr-4 mt-16 flex flex-col md:ml-8">
      <h2 className="text-3xl font-bold underline decoration-[#006853]">
        Who Am I?
      </h2>
      <p className="mt-2 max-w-4xl text-lg">
        To give you a rough idea, I created a branding board.
      </p>
      <div className="relative aspect-video w-full">
        <Image
          src="https://hz2lv8281m.ufs.sh/f/v97wqiBL7HaNf3u7v0Pq0gtkDfMGlmTpwK42cP76vrUxEWzL"
          alt="Branding Board covering details of who I am"
          fill
          className="aspect-video"
        />
      </div>
    </div>
  );
}

function AboutNarrative() {
  return (
    <div className="ml-4 mr-4 mt-16 flex flex-col md:ml-8">
      <h2 className="text-3xl font-bold underline decoration-[#006853]">
        If you want to know my history
      </h2>
      <p className="mt-2 max-w-4xl text-lg">
        I wrote a short narrative about what lead to where I am today.
      </p>
      <Link href="/personal-narrative" className="mt-2">
        <Button size="lg" className="bg-[#006853] hover:bg-[#008158]">
          Read The Narrative
          <IconArrowRight />
        </Button>
      </Link>
    </div>
  );
}
