"use client";

import {
  IconArrowsShuffle,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceSpeaker,
  IconExplicit,
  IconMoodSad,
  IconRepeat,
  IconRepeatOnce,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { PlaybackResponse } from "~/server/spotify";
import { api } from "~/trpc/react";

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
    <div className="overflow h-10">
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
        staggerChildren: 0.4,
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
      className="space-x-4"
    >
      <motion.a
        variants={item}
        href="/summary"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        <Image
          src="/icons/file.svg"
          alt=""
          width={24}
          height={24}
          className="invert"
        />
        Resume
      </motion.a>
      <motion.a
        variants={item}
        href="/photos"
        className={buttonVariants({ variant: "ghost", size: "lg" })}
      >
        <Image
          src="/icons/photo.svg"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
        Photos
      </motion.a>
      <motion.a
        variants={item}
        href="/spotify"
        className={buttonVariants({ variant: "ghost", size: "lg" })}
      >
        <Image
          src="/icons/spotify.png"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
        Spotify
      </motion.a>
      <motion.a
        variants={item}
        href="https://github.com/CodedMasonry"
        className={buttonVariants({ variant: "ghost", size: "lg" })}
      >
        <Image
          src="/icons/github.svg"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
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
        whileInView={{ x: 112, rotate: 360 }}
        transition={{
          x: { duration: 1, type: "spring", delay: 0.5 },
          rotate: { repeat: Infinity, duration: 3, ease: "linear" },
        }}
        className="size-96 drop-shadow-lg"
      >
        <Image
          src="/vinyl.webp"
          width={384}
          height={384}
          alt=""
          loading="lazy"
          className="size-96 drop-shadow-lg"
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
        loading="lazy"
        className="size-96 translate-x-28"
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
            utils.spotify.invalidate();
          }
        } else {
          setProgress(data.progress_ms);
        }
      }
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [response]);

  return (
    <AnimatePresence mode="wait">
      {data && <CurrentlyPlaying data={data} progress={progress!} />}
      {data == null && <NothingPlaying />}
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-row"
    >
      <div className="mr-44">
        <Image
          src={data?.item.album.images[0]?.url as string}
          alt=""
          width={384}
          height={384}
          unoptimized
          loading="lazy"
          className="absolute z-10 h-96 w-96 rounded-xl bg-background shadow-md"
        />
        <ClientVinyl isPlaying={data.is_playing} />
      </div>
      <div className="mt-16 flex flex-col drop-shadow-lg">
        <h3 className="text-6xl font-semibold">{data.item.name}</h3>
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
        <h4 className="mt-1 text-4xl">
          {data.item.artists.map((v) => v.name).join(", ")}
        </h4>
        <h5 className="mt-1 text-2xl font-light">
          {data.item.album.name} ({data.item.album.release_date})
        </h5>
        <p className="mt-1">
          {formatMilliseconds(progress!)} /{" "}
          {formatMilliseconds(data.item.duration_ms!)}
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="flex flex-row"
    >
      <div className="mr-44">
        <IconMoodSad
          color="white"
          className="absolute z-10 h-96 w-96 rounded-xl bg-destructive shadow-md"
        />
        <Image
          src="/broken_vinyl.webp"
          alt=""
          width={384}
          height={384}
          loading="lazy"
          className="h-96 w-96 translate-x-28 rounded-xl drop-shadow-lg"
        />
      </div>
      <div className="mt-16 flex flex-col drop-shadow-lg">
        <h3 className="text-6xl font-semibold">Nothings Playing</h3>
        <p className="mt-4 text-4xl">
          I can't show you something that doesn't exist
        </p>
        <p className="mt-4 text-2xl font-light underline decoration-primary">
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
