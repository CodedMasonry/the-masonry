"use server";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { CycleText } from "~/components/cycle-text";
import Footer from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { utapi } from "~/server/uploadthing";
import { api } from "~/trpc/server";

// Lazy load Client Section
const SpotifyClientSection = dynamic(() => import("~/components/spotify"));
const ClientCarousel = dynamic(() => import("~/app/client-carousel"));
const SectionMentorships = dynamic(() => import("~/app/section-mentorship"));
const SectionTooling = dynamic(() => import("~/app/section-tooling"));

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <Navbar />

      <SectionHeader />
      <SectionSpotify />
      <SectionImages />
      <SectionMentorships />
      <SectionTooling />

      <Footer />
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
  // Prefetch
  const initial = (await api.spotify.getPlayback()) ?? null;

  return (
    <div
      id="spotify"
      className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-32"
    >
      <h3 className="mb-2 text-3xl font-medium underline decoration-primary md:-ml-4 md:text-4xl">
        I Like Music
      </h3>
      <p className="mr-4 md:text-lg">
        So I created a section that shows what I&apos;m currently listening to.
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

async function SectionImages() {
  const images = await utapi
    .listFiles()
    .then((v) => v.files.map((img) => "https://dxgc3f8f0p.ufs.sh/f/" + img.key));

  // First Half of images
  const setOne = images.slice(0, images.length / 2);
  // Second half
  const setTwo = images.slice(images.length / 2, images.length);

  return (
    <div>
      <div id="photos" className="mb-8 ml-8 mr-4 mt-24 md:ml-36 md:mt-32">
        <h3 className="text-3xl font-medium underline decoration-primary drop-shadow-lg md:-ml-4 md:text-4xl">
          I&apos;m A Photographer
        </h3>
        <p className="mt-2 drop-shadow-lg md:text-lg">
          So I put my work on this website for you to see.
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
    <div className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-36">
      <h3 className="mb-2 text-3xl font-medium underline decoration-primary md:-ml-4 md:text-4xl">
        Let me pull some stats from Github
      </h3>
      <p className="mr-4 md:text-lg">
        Might as well showcase them for those who are curious.
      </p>
    </div>
  );
}
