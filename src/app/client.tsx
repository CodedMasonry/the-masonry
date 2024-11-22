"use client";

import {
  IconArrowsShuffle,
  IconBrandGithub,
  IconBrandSpotify,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceSpeaker,
  IconExplicit,
  IconFile,
  IconMoodSad,
  IconPhoto,
  IconRepeat,
  IconRepeatOnce,
} from "@tabler/icons-react";
import { AnimatePresence, delay, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type PlaybackResponse } from "~/server/spotify";
import { api } from "~/trpc/react";
import React from "react";
import { ImageCarousel } from "~/components/img-carousel";

export function DrawTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, type: "spring" }}
      className="text-6xl font-extrabold text-primary drop-shadow-lg md:text-7xl"
    >
      Hello, I&apos;m Brock.
    </motion.h1>
  );
}

export function DrawSubTitle() {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, type: "spring", delay: 0.5 }}
      className="text-4xl drop-shadow-lg"
    >
      <CycleText
        options={[
          "Software Developer",
          "Cybersecurity Enthusiast",
          "Photographer",
          "Drone Pilot",
        ]}
      />
    </motion.h2>
  );
}

export function DrawTitleBody() {
  return (
    <motion.p
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, type: "spring", delay: 1 }}
      className="mr-4 pb-4 pt-2 drop-shadow-lg md:max-w-3xl md:pt-4"
    >
      Being a software engineer, I wanted to write code, and I wanted to convey
      who I am beyond just words, so I created a website.
    </motion.p>
  );
}

export function CycleText({ options }: { options: Array<string> }) {
  const [index, setIndex] = useState(0);

  // Rotate text automatically on an interval
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % options.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [options.length]);

  return (
    <div className="overflow h-12">
      <AnimatePresence mode="sync">
        <motion.div
          key={options[index]}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: [0, 0, 1], y: 0 }}
          exit={{ opacity: [1, 0, 0], y: 25 }}
          transition={{ duration: 0.5, times: [0, 0.5, 1] }}
          className="absolute left-0 top-0 underline decoration-primary"
        >
          {options[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function StaggerButtons() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto -ml-4 grid max-w-screen-sm grid-cols-2 place-items-center gap-4 p-4 md:ml-0 md:max-w-none md:grid-cols-4"
      transition={{ staggerChildren: 0.5 }}
    >
      <motion.a
        variants={item}
        href="/resume"
        className={`mr-4 ${buttonVariants({ variant: "default", size: "lg" })}`}
      >
        <IconFile />
        Resume
      </motion.a>
      <motion.a
        variants={item}
        href="#photos"
        className={`mr-4 ${buttonVariants({ variant: "ghost", size: "lg" })}`}
      >
        <IconPhoto />
        Photos
      </motion.a>
      <motion.a
        variants={item}
        href="#spotify"
        className={`mr-4 ${buttonVariants({ variant: "ghost", size: "lg" })}`}
      >
        <IconBrandSpotify />
        Spotify
      </motion.a>
      <motion.a
        variants={item}
        href="https://github.com/CodedMasonry"
        className={buttonVariants({ variant: "ghost", size: "lg" })}
      >
        <IconBrandGithub />
        Github
      </motion.a>
    </motion.div>
  );
}

export function ClientVinyl({ isPlaying }: { isPlaying: boolean }) {
  if (isPlaying) {
    return (
      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: "33%", rotate: 360 }}
        transition={{
          x: { duration: 1, type: "spring", delay: 0.5 },
          rotate: { repeat: Infinity, duration: 5, ease: "linear" },
        }}
        className="relative size-64 drop-shadow-lg md:size-96"
      >
        <Image
          src="/vinyl.webp"
          fill
          alt=""
          loading="eager"
          className="drop-shadow-lg"
        />
      </motion.div>
    );
  } else {
    return (
      <Image
        src="/vinyl.webp"
        width={384}
        height={384}
        alt=""
        loading="eager"
        className="size-64 translate-x-28 md:size-96"
      />
    );
  }
}

export function SpotifyClientSection() {
  // Utility to invalidate cache
  const utils = api.useUtils();
  // Fetch data hook
  const response = api.spotify.getPlayback.useQuery(void 0, {
    staleTime: 10 * 1000,
  });
  // Parse response to either an object or null
  const data = useMemo(() => response.data ?? null, [response]);
  // Simulating live timing
  const [progress, setProgress] = useState<number | null>(null);

  // Update progress based on data changes
  useEffect(() => {
    if (data?.progress_ms) {
      setProgress(data.progress_ms); // Reset progress to the new data's progress_ms
    } else {
      setProgress(null); // Reset progress to null if data is null
    }
  }, [data]);

  // Increment every second
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      // If data is real
      if (data?.progress_ms) {
        // If progress is real & music is playing
        if (progress && data.is_playing) {
          // If duration is less than how long it should be
          if (progress < data.item.duration_ms) {
            setProgress(progress + 1000);
          } else if (progress >= data.item.duration_ms) {
            // Revalidate local cache because we hit the precieved end of the song
            void utils.spotify.invalidate();
          }
        } else {
          setProgress(data.progress_ms);
        }
      }
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [data, progress, response, utils.spotify]);

  return (
    <AnimatePresence mode="wait">
      {data ? (
        <CurrentlyPlaying data={data} progress={progress!} />
      ) : (
        <NothingPlaying />
      )}
    </AnimatePresence>
  );
}

function CurrentlyPlaying({
  data,
  progress,
}: {
  data: PlaybackResponse;
  progress: number;
}) {
  return (
    <motion.div
      key="CurrentlyPlaying"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 1, delay: 2 }}
      className="mr-6 flex flex-col md:flex-row"
    >
      <div className="relative mr-44 size-64 md:size-96">
        <Image
          // There is assumed to always be 2 thumbnails, each with a link.
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          src={data?.item.album.images[1]?.url!}
          alt=""
          fill
          unoptimized
          priority
          className="absolute z-10 rounded-xl bg-background shadow-md md:ml-0"
        />
        <ClientVinyl isPlaying={data.is_playing} />
      </div>
      <div className="mt-4 flex flex-col drop-shadow-lg md:ml-0 md:mt-16">
        <h4 className="text-5xl font-semibold md:text-6xl">{data.item.name}</h4>
        <div className="mt-1 flex min-h-6 space-x-2">
          {data.item.explicit && (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <IconExplicit />
              </TooltipTrigger>
              <TooltipContent>
                <p>This song is marked Explicit by Spotify</p>
              </TooltipContent>
            </Tooltip>
          )}
          {data.repeat_state == "context" && (
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <IconRepeat />
              </TooltipTrigger>
              <TooltipContent>
                <p>Playback is set to repeat</p>
              </TooltipContent>
            </Tooltip>
          )}
          {data.repeat_state == "track" && (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <IconRepeatOnce />
              </TooltipTrigger>
              <TooltipContent>
                <p>Playback is set to repeat this song</p>
              </TooltipContent>
            </Tooltip>
          )}
          {data.shuffle_state && (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <IconArrowsShuffle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Playback is set to shuffle</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <h5 className="mt-1 text-3xl md:text-4xl">
          {data.item.artists.map((v) => v.name).join(", ")}
        </h5>
        <h6 className="mt-1 text-xl font-light md:text-2xl">
          {data.item.album.name} ({data.item.album.release_date})
        </h6>
        <p className="mt-1 font-semibold">
          {formatMilliseconds(progress)} /{" "}
          {formatMilliseconds(data.item.duration_ms)}
        </p>
        <div className="mb-4 mt-auto flex">
          Playing now on <Device type={data.device.type} /> {data.device.name}
        </div>
      </div>
    </motion.div>
  );
}

function NothingPlaying() {
  return (
    <motion.div
      key="NothingPlaying"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 1, delay: 2 }}
      className="mr-6 flex flex-col md:flex-row"
    >
      <div className="relative mr-44 size-64 md:size-96">
        <IconMoodSad
          color="white"
          className="absolute z-10 size-64 rounded-xl bg-destructive shadow-md md:size-96"
        />
        <Image
          src="/broken_vinyl.webp"
          alt=""
          fill
          priority
          className="translate-x-20 rounded-xl drop-shadow-lg md:translate-x-28"
        />
      </div>
      <div className="mt-4 flex flex-col drop-shadow-lg md:mt-16">
        <h4 className="text-5xl font-semibold md:text-6xl">Nothings Playing</h4>
        <p className="mt-2 text-3xl md:mt-4 md:text-4xl">
          I can&apos;t show you something that doesn&apos;t exist
        </p>
        <p className="mt-2 text-xl font-light underline decoration-primary md:mt-4 md:text-2xl">
          But this section will update when I turn the music on
        </p>
      </div>
    </motion.div>
  );
}

function Device({ type }: { type: string }) {
  const lowercase = type.toLowerCase();
  if (lowercase == "computer") {
    return <IconDeviceLaptop />;
  } else if (lowercase == "smartphone") {
    return <IconDeviceMobile />;
  } else {
    return <IconDeviceSpeaker />;
  }
}

function formatMilliseconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ClientCarousel({ images }: { images: Array<string> }) {
  // First Half of images
  const setOne = images.slice(0, images.length / 2);
  // Second half
  const setTwo = images.slice(images.length / 2, images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.25, type: "spring" }}
      className="flex w-full flex-col"
    >
      <ImageCarousel images={setOne} direction="forward" />
      <ImageCarousel images={setTwo} direction="backward" />
    </motion.div>
  );
}
