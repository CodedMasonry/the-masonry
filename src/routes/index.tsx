import { createFileRoute } from "@tanstack/react-router";
import { CycleText } from "@/components/home/cycle-text";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      <div className="relative border-2 border-red-500">
        <img className="aspect-video" src="/self.jpg" alt="" />
        <SectionHeader />
      </div>
      <SectionPhoto />
      <SectionMusic />
      <SectionHighSchool />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="mt-24 mr-4 ml-8 flex flex-col space-y-2 md:mt-44 md:ml-36">
      <h1 className="font-extrabold text-6xl text-primary drop-shadow-lg md:text-7xl">
        Hello, I&apos;m Brock.
      </h1>
      <h2 className="relative my-2 text-4xl">
        <CycleText
          options={[
            "Software Developer",
            "DevOps Engineer",
            "UI Designer",
            "Photographer",
            "Drone Pilot",
            "Video Editor",
          ]}
        />
      </h2>
      <p className="mr-4 pt-2 pb-4 drop-shadow-lg md:max-w-3xl md:pt-4">
        Being a software developer, I wanted to write code, and I wanted to
        convey who I am beyond just words, so I created a website.
      </p>
      <div className="-ml-2 drop-shadow-md">
        <Button size="lg" asChild>
          <Link to="/resume" className="cursor-default">
            <img src="/icons/paper.svg" alt="" className="invert" />
            Resume
          </Link>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <Link to="/photos" className="ml-4 cursor-default">
            <img src="/icons/photo.svg" alt="" />
            Photos
          </Link>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <a
            href="https://www.linkedin.com/in/brockshaffer"
            className="ml-4 cursor-default"
          >
            <img src="/icons/linkedin.svg" alt="" />
            LinkedIn
          </a>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <a
            href="https://github.com/CodedMasonry"
            className="ml-4 cursor-default"
          >
            <img src="/icons/github.svg" alt="" className="size-6" />
            Github
          </a>
        </Button>
      </div>
    </div>
  );
}

function SectionPhoto() {
  return (
    <div className="mx-8 mt-28 flex flex-col md:mx-36 md:mt-36">
      <h3 className="mb-2 text-3xl underline decoration-primary drop-shadow-lg md:text-4xl">
        Explore my photography
      </h3>
      <p>e</p>
    </div>
  );
}

function SectionMusic() {
  return (
    <div className="mx-8 mt-28 flex flex-col md:mx-36 md:mt-36">
      <h3 className="mb-2 text-3xl underline decoration-primary drop-shadow-lg md:text-4xl">
        Rocking to the metal
      </h3>
      <div className="flex flex-row gap-4">
        <div>List</div>
        <div>Descriptions</div>
      </div>
    </div>
  );
}

function SectionHighSchool() {
  return (
    <div className="mx-8 mt-28 flex flex-col md:mx-36 md:mt-36">
      <h3 className="mb-2 text-3xl underline decoration-primary drop-shadow-lg md:text-4xl">
        What I've done in High School
      </h3>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <HighSchoolGridItem
          href="/experiences/ypa"
          image="/icons/ypa.png"
          title="Young Professional Academy"
          subtitle="Dublin City Schools"
        />
        <HighSchoolGridItem
          href="/experiences/outcomes"
          image="/icons/outcomes.png"
          title="Software Engineering Internship"
          subtitle="Outcomes"
        />
        <HighSchoolGridItem
          href="https://www.dublinroboticsboosters.org/"
          image="/icons/team1014.jpeg"
          title="Robotics Team"
          subtitle="Team 1014, Bad Robots"
          external
        />
        <HighSchoolGridItem
          href="/experiences/fstlogistics"
          image="/icons/fst.jpeg"
          title="IT Department Internship"
          subtitle="FST Logistics"
        />
      </div>
    </div>
  );
}

function HighSchoolGridItem({
  href,
  image,
  title,
  subtitle,
  external,
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
  external?: boolean | null;
}) {
  return (
    <Link
      to={href}
      className="group hover:-translate-y-2 mt-4 flex flex-row rounded-xl border-2 border-transparent p-4 drop-shadow-lg transition cursor-default hover:border-primary"
    >
      <img
        src={image}
        alt=""
        className="my-auto aspect-square size-24 md:size-28"
      />
      <div className="ml-4 flex w-full flex-col items-start border-foreground border-l-2 pl-4 align-middle transition">
        <h4 className="w-full font-semibold text-xl md:text-2xl lg:text-3xl">
          {title}
        </h4>
        <p className="md:text-lg">{subtitle}</p>
        {external ? (
          <ExternalLink className="mt-auto mb-1 size-6 self-end group-hover:stroke-primary transition" />
        ) : (
          <ChevronRight className="mt-auto mb-1 size-6 self-end group-hover:stroke-primary transition" />
        )}
      </div>
    </Link>
  );
}
