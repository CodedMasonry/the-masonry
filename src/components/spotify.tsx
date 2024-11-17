"use client";

import {
  IconArrowsShuffle,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceSpeaker,
  IconExplicit,
  IconPhone,
  IconRepeat,
  IconRepeatOnce,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "~/components/ui/button";
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
          x: { duration: 1, type: "spring" },
          rotate: { repeat: Infinity, duration: 3, ease: "linear" },
        }}
        className="drop-shadow-lg"
      >
        <Image
          src="/vinyl.webp"
          width={384}
          height={384}
          alt=""
          loading="lazy"
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
        loading="lazy"
        className="translate-x-28"
      />
    );
  }
}

export function SpotifySection() {
  const response = api.spotify.getPlayback.useQuery(void 0, {
    staleTime: 10 * 1000,
  });
  const data = useMemo(() => response.data ?? null, [response]);

  return (
    <div className="mb-32 ml-36 mt-32 flex flex-col">
      <h3 className="-ml-4 mb-4 text-3xl underline decoration-primary">
        I listen to a decent amount of music.
      </h3>
      {data && (
        <div className="flex flex-row">
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
            <div className="flex min-h-6 space-x-2">
              {data.item.explicit && <IconExplicit />}
              {data.repeat_state == "context" && <IconRepeat />}
              {data.repeat_state == "track" && <IconRepeatOnce />}
              {data.shuffle_state && <IconArrowsShuffle />}
            </div>
            <h4 className="text-4xl">
              {data.item.artists.map((v) => v.name).join(", ")}
            </h4>
            <h5 className="text-2xl font-light">
              {data.item.album.name} ({data.item.album.release_date})
            </h5>
            <p>
              {formatMilliseconds(data.progress_ms!)} /{" "}
              {formatMilliseconds(data.item.duration_ms!)}
            </p>
            <div className="mb-4 mt-auto flex">
              Playing now on <Device type={data.device.type} />{" "}
              {data.device.name}
            </div>
          </div>
        </div>
      )}
    </div>
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
