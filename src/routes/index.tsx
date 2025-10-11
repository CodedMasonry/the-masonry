import { createFileRoute } from "@tanstack/react-router";
import { CycleText } from "@/components/home/cycle-text";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      <SectionHeader />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="relative mt-24 mr-4 ml-8 flex flex-col space-y-2 md:mt-44 md:ml-36">
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
          <a href="/resume">
            <img src="/icons/paper.svg" alt="" className="invert" />
            Resume
          </a>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <a href="/photos" className="mx-4">
            <img src="/icons/photo.svg" alt="" />
            Photos
          </a>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <a href="https://www.linkedin.com/in/brockshaffer" className="mx-4">
            <img src="/icons/linkedin.svg" alt="" />
            LinkedIn
          </a>
        </Button>
        <Button size="lg" variant="ghost" asChild>
          <a href="https://github.com/CodedMasonry">
            <img src="/icons/github.svg" alt="" className="size-6" />
            Github
          </a>
        </Button>
      </div>
    </div>
  );
}
