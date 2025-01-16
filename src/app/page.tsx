"use server";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { CycleText } from "~/components/cycle-text";
import { Navbar } from "~/components/navbar";
import SpotifyClientSection from "~/components/spotify";
import { buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { utapi } from "~/server/uploadthing";
import { api } from "~/trpc/server";

// Lazy load Client Section
const ClientCarousel = dynamic(() => import("~/app/client-carousel"));
const SectionTooling = dynamic(() => import("~/app/section-tooling"));

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <Navbar />

      <SectionHeader />
      <SectionSpotify />
      <SectionGithub />
      <SectionImages />
      <SectionTooling />

      <SectionFooter />
    </main>
  );
}

function SectionHeader() {
  return (
    <div className="relative ml-8 mr-4 mt-10 flex flex-col space-y-2 md:ml-36 md:mt-28">
      <h1 className="text-6xl font-extrabold text-primary drop-shadow-lg md:text-7xl">
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
      <p className="mr-4 pb-4 pt-2 drop-shadow-lg md:max-w-3xl md:pt-4">
        Being a software developer, I wanted to write code, and I wanted to
        convey who I am beyond just words, so I created a website.{" "}
      </p>
      <div className="-ml-2">
        <Link
          href="/resume"
          className={`m-2 drop-shadow-md ${buttonVariants({ variant: "default", size: "lg" })}`}
        >
          <Image
            src="/icons/paper.svg"
            alt=""
            width={28}
            height={28}
            className="invert"
          />
          Resume
        </Link>
        <Link
          href="/photos"
          className={`m-2 drop-shadow-md ${buttonVariants({ variant: "ghost", size: "lg" })}`}
        >
          <Image
            src="/icons/photo.svg"
            alt=""
            width={28}
            height={28}
            className="dark:invert"
          />
          Photos
        </Link>
        <Link
          href="#spotify"
          className={`m-2 drop-shadow-md ${buttonVariants({ variant: "ghost", size: "lg" })}`}
        >
          <Image
            src="/icons/spotify_mark.png"
            alt=""
            width={28}
            height={28}
            className="dark:invert"
          />
          Spotify
        </Link>
        <Link
          href="https://github.com/CodedMasonry"
          className={`m-2 drop-shadow-md ${buttonVariants({ variant: "ghost", size: "lg" })}`}
        >
          <Image
            src="/icons/github.svg"
            alt=""
            width={28}
            height={28}
            className="dark:invert"
          />
          Github
        </Link>
      </div>
    </div>
  );
}

async function SectionSpotify() {
  // pull cached prefetch
  const initial = await api.spotify.getPlayback();

  return (
    <div
      id="spotify"
      className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-32"
    >
      <h3 className="mb-2 text-3xl font-medium underline decoration-primary md:-ml-4 md:text-4xl">
        I listen to a significant amount of music.
      </h3>
      <p className="mr-4 md:text-lg">
        So I created a sections that shows what I&apos;m currently listening to.
      </p>
      <div className="mt-4 min-h-[30rem] md:min-h-96">
        <Suspense fallback={<SpotifySuspense />}>
          <SpotifyClientSection initial={initial} />
        </Suspense>
      </div>
    </div>
  );
}

function SpotifySuspense() {
  return (
    <div
      key="NothingPlaying"
      className="mr-6 flex h-[30rem] flex-col md:h-96 md:flex-row"
    >
      <div className="relative mr-44 size-64 md:size-96">
        <Skeleton className="z-10 size-64 rounded-xl bg-destructive shadow-md md:size-96" />
      </div>
      <div className="mt-4 flex flex-col drop-shadow-lg md:mt-16">
        <Skeleton className="h-14 w-3/4 md:h-16" />
        <Skeleton className="mt-2 h-8 w-3/4 md:mt-4 md:h-10" />
        <Skeleton className="mt-2 h-6 w-3/4 md:mt-4 md:h-7" />
      </div>
    </div>
  );
}

function SectionGithub() {
  return (
    <div className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-32"></div>
  );
}

async function SectionImages() {
  const images = await utapi
    .listFiles()
    .then((v) =>
      v.files.map((img) => "https://utfs.io/a/dxgc3f8f0p/" + img.key),
    );
  // First Half of images
  const setOne = images.slice(0, images.length / 2);
  // Second half
  const setTwo = images.slice(images.length / 2, images.length);

  return (
    <div>
      <div id="photos" className="mb-8 ml-8 mr-4 mt-24 md:ml-36 md:mt-32">
        <h3 className="text-3xl font-medium underline decoration-primary drop-shadow-lg md:-ml-4 md:text-4xl">
          Photos expresses a mood in a snapshot of time.
        </h3>
        <p className="mt-2 drop-shadow-lg md:text-lg">
          The ability to represent a moment, a setting, an emotion is what
          inspires me to take them.
        </p>
      </div>
      <Suspense>
        <ClientCarousel setOne={setOne} setTwo={setTwo} />
      </Suspense>
    </div>
  );
}

function SectionProjects() {
  return (
    <div
      className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-36"
    >
      <h3 className="mb-2 text-3xl font-medium underline decoration-primary md:-ml-4 md:text-4xl">
        Let me pull some stats from Github
      </h3>
      <p className="mr-4 md:text-lg">
        Might as well showcase them for those who are curious.
      </p>
    </div>
  );
}

function SectionFooter() {
  return (
    <div className="mt-32 flex flex-row bg-background p-6">
      <Link
        href="mailto:contact@brockshaffer.dev"
        className="flex items-center text-2xl hover:underline"
      >
        <Image
          src="/favicon.svg"
          alt=""
          width={32}
          height={32}
          className="mr-4"
        />
        contact@brockshaffer.dev
      </Link>
    </div>
  );
}
