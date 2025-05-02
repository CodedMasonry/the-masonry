// The home page doesn't need to be SSR, but needs to be revalidated often
// to allow prefetch to re-run
export const revalidate = 300; // seconds

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { CycleText } from "~/components/home/cycle-text";
import { buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { utapi } from "~/server/uploadthing";
import { api } from "~/trpc/server";
import SectionLearning from "../../components/home/section-learning";

// Lazy load Client Section
const SpotifyClientSection = dynamic(() => import("~/components/home/spotify"));
const ClientCarousel = dynamic(
	() => import("~/components/home/client-carousel"),
);

export default async function HomePage() {
	return (
		<>
			<SectionHeader />
			<SectionSpotify />
			<SectionImages />
			<SectionLearning />
		</>
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
				<Link
					href="/resume"
					className={`m-2 ${buttonVariants({ variant: "default", size: "lg" })}`}
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
					className={`m-2 ${buttonVariants({ variant: "ghost", size: "lg" })}`}
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
					href="https://www.linkedin.com/in/brockshaffer"
					className={`m-2 ${buttonVariants({ variant: "ghost", size: "lg" })}`}
				>
					<Image
						src="/icons/linkedin.svg"
						alt=""
						width={28}
						height={28}
						className="dark:invert"
					/>
					LinkedIn
				</Link>
				<Link
					href="https://github.com/CodedMasonry"
					className={`m-2 ${buttonVariants({ variant: "ghost", size: "lg" })}`}
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
			className="mt-28 mr-4 ml-8 flex flex-col md:mt-32 md:ml-36"
		>
			<h3 className="md:-ml-4 mb-2 font-medium text-3xl underline decoration-primary md:text-4xl">
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
		.then((v) =>
			v.files.map((img) => "https://dxgc3f8f0p.ufs.sh/f/" + img.key),
		);

	// First Half of images
	const setOne = images.slice(0, images.length / 2);
	// Second half
	const setTwo = images.slice(images.length / 2, images.length);

	return (
		<div>
			<div id="photos" className="mt-24 mr-4 mb-8 ml-8 md:mt-32 md:ml-36">
				<h3 className="md:-ml-4 font-medium text-3xl underline decoration-primary drop-shadow-lg md:text-4xl">
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
		<div className="mt-28 mr-4 ml-8 flex flex-col md:mt-36 md:ml-36">
			<h3 className="md:-ml-4 mb-2 font-medium text-3xl underline decoration-primary md:text-4xl">
				Let me pull some stats from Github
			</h3>
			<p className="mr-4 md:text-lg">
				Might as well showcase them for those who are curious.
			</p>
		</div>
	);
}
