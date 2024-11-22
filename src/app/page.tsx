import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Suspense } from "react";
import {
  DrawSubTitle,
  DrawTitle,
  DrawTitleBody,
  StaggerButtons,
} from "~/app/client";
import { Navbar } from "~/components/navbar";

const SectionImages = dynamic(() => import("~/app/section-images"));
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
      <DrawTitle />
      <DrawSubTitle />
      <DrawTitleBody />
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
      <div className="mt-4 h-fit">
        <SpotifyClientSection />
      </div>
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
