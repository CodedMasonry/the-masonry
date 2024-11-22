import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { CycleText, StaggerButtons } from "~/app/client";
import { Navbar } from "~/components/navbar";
import { utapi } from "~/server/uploadthing";

const ClientCarousel = dynamic(() => import("~/app/client-carousel"));
const SectionTooling = dynamic(() => import("~/app/section-tooling"));

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <SectionHeader />
      <SectionSpotify />
      <SectionImages />
      <SectionTooling />
      <SectionFooter />
    </main>
  );
}

function SectionHeader() {
  return (
    <div className="ml-4 mt-8 flex flex-col space-y-2 md:ml-36 md:mt-28">
      <h1 className="text-6xl font-extrabold text-primary drop-shadow-lg md:text-7xl">
        Hello, I&apos;m Brock.
      </h1>
      <h2 className="text-4xl drop-shadow-lg">
        <CycleText
          options={[
            "Software Developer",
            "Cybersecurity Enthusiast",
            "Photographer",
            "Drone Pilot",
          ]}
        />
      </h2>
      <p className="mr-4 pb-4 pt-2 drop-shadow-lg md:max-w-3xl md:pt-4">
        Being a software engineer, I wanted to write code, and I wanted to
        convey who I am beyond just words, so I created a website.{" "}
      </p>
      <StaggerButtons />
    </div>
  );
}

// Lazy load Client Section
const SpotifyClientSection = dynamic(() =>
  import("~/app/client").then((mod) => mod.SpotifyClientSection),
);

function SectionSpotify() {
  return (
    <div id="spotify" className="ml-8 mt-28 flex flex-col md:ml-36 md:mt-32">
      <h3 className="mb-2 text-4xl font-medium underline decoration-primary md:-ml-4">
        I listen to a significant amount of music.
      </h3>
      <p className="mr-4 md:text-lg">
        So I created a sections that shows what I&apos;m currently listening to.
      </p>
      <div className="mt-4 h-[30rem] md:h-96">
        <SpotifyClientSection />
      </div>
    </div>
  );
}

async function SectionImages() {
  const images = await utapi
    .listFiles()
    .then((v) =>
      v.files.map((img) => "https://utfs.io/a/dxgc3f8f0p/" + img.key),
    );

  return (
    <div>
      <div id="photos" className="mb-8 ml-4 mr-4 mt-28 md:ml-36 md:mt-32">
        <h3 className="text-4xl font-medium underline decoration-primary drop-shadow-lg md:-ml-4">
          Photos expresses a mood in a snapshot of time.
        </h3>
        <p className="mt-2 text-lg drop-shadow-lg">
          The ability to represent a moment, a setting, an emotion is what
          inspires me to take them.
        </p>
      </div>
      <ClientCarousel images={images} />
    </div>
  );
}

function SectionFooter() {
  return (
    <div className="mt-32 flex flex-row bg-background p-6">
      <a
        href="mailto:brock@brockshaffer.dev"
        className="flex items-center text-2xl hover:underline"
      >
        <Image
          src="/favicon.svg"
          alt=""
          width={32}
          height={32}
          className="mr-4"
        />
        brock@brockshaffer.dev
      </a>
    </div>
  );
}
