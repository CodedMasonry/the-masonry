"use client";

import {
  IconArrowsShuffle,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDeviceSpeaker,
  IconExplicit,
  IconExternalLink,
  IconMoodSad,
  IconRepeat,
  IconRepeatOnce,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PlaybackResponse } from "~/server/spotify";
import { api } from "~/trpc/react";

// Have to pass initial as hydration fails without it
export default function SpotifyClientSection({
  initial,
}: {
  initial: PlaybackResponse | null;
}) {
  // Utility to invalidate cache
  const utils = api.useUtils();

  // Have initial data be passed to client, every other update to refresh every 10 seconds
  const response = api.spotify.getPlayback.useQuery(undefined, {
    initialData: initial,
    staleTime: 10 * 1000,
  });

  // If we have an up to date response, use it, else use null
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
  }, [data, progress, utils.spotify]);

  return (
    <div>
      {data ? (
        <CurrentlyPlaying data={data} progress={progress!} />
      ) : (
        <NothingPlaying />
      )}
    </div>
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
    <div key="CurrentlyPlaying" className="mr-6 flex flex-col md:flex-row">
      <Link
        href={data.item.external_urls.spotify}
        className="group relative mr-44 size-64 cursor-default md:size-96"
      >
        <IconExternalLink className="absolute right-2 bottom-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
        <Image
          // There is assumed to always be 2 thumbnails, each with a link.
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          src={data.item.album.images[1]?.url!}
          alt={"Open spotify link to " + data.item.name}
          fill
          loading="eager"
          unoptimized
          className="absolute z-10 rounded-xl bg-background shadow-md ring-2 ring-transparent transition group-hover:ring-primary md:ml-0"
        />
        <ClientVinyl isPlaying={data.is_playing} />
      </Link>
      <div className="mt-4 flex flex-col drop-shadow-lg md:mt-16 md:ml-0">
        <h4 className="font-semibold text-5xl md:text-6xl">{data.item.name}</h4>
        <div className="mt-1 flex min-h-6 space-x-2">
          {data.item.explicit && <IconExplicit />}
          {data.repeat_state === "context" && <IconRepeat />}
          {data.repeat_state === "track" && <IconRepeatOnce />}
          {data.shuffle_state && <IconArrowsShuffle />}
        </div>
        <h5 className="mt-1 text-3xl md:text-4xl">
          {data.item.artists.map((v) => v.name).join(", ")}
        </h5>
        <h6 className="mt-1 font-light text-xl md:text-2xl">
          {data.item.album.name} ({data.item.album.release_date})
        </h6>
        <p className="mt-1 font-semibold">
          {formatMilliseconds(progress)} /{" "}
          {formatMilliseconds(data.item.duration_ms)}
        </p>
        {data.device && (
          <div className="mt-auto mb-4 flex">
            Playing now on <Device type={data.device.type} /> {data.device.name}
          </div>
        )}
        {data.is_previous && (
          <div className="mt-auto mb-4 flex">
            No music is playing, but this is the most recent song
          </div>
        )}
      </div>
    </div>
  );
}

function NothingPlaying() {
  // Utility to invalidate cache
  const utils = api.useUtils();

  // Check again every 10 seconds
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      void utils.spotify.invalidate();
    }, 10000);

    // Clearing the interval
    return () => clearInterval(interval);
  }, [utils.spotify]);

  return (
    <div key="NothingPlaying" className="mr-6 flex flex-col md:flex-row">
      <div className="relative mr-44 size-64 md:size-96">
        <IconMoodSad
          color="white"
          className="absolute z-10 size-64 rounded-xl bg-destructive shadow-md md:size-96"
        />
        <ClientVinyl />
      </div>
      <div className="mt-4 flex flex-col drop-shadow-lg md:mt-16">
        <h4 className="font-semibold text-5xl md:text-6xl">
          Unexpected Result
        </h4>
        <p className="mt-2 text-3xl md:mt-4 md:text-4xl">
          The server needs some time to think about what went wrong
        </p>
        <p className="mt-2 font-light text-xl underline decoration-primary md:mt-4 md:text-2xl">
          This section will update when the server fixes itself (eventually)
        </p>
      </div>
    </div>
  );
}

export function ClientVinyl({
  isPlaying,
}: {
  isPlaying?: boolean | undefined;
}) {
  if (isPlaying) {
    return (
      <motion.div
        key="Vinyl"
        initial={{ x: 0, rotate: 0 }}
        animate={{ rotate: 360 }}
        whileInView={{ x: "33%" }}
        transition={{
          x: { duration: 1, delay: 0.5, type: "spring" },
          rotate: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "linear",
          },
        }}
        className="relative size-64 md:size-96"
      >
        <Image src="/vinyl.webp" fill alt="" loading="eager" />
      </motion.div>
    );
  } else {
    return (
      <motion.div
        key="Vinyl"
        initial={{ x: 0 }}
        whileInView={{ x: "33%" }}
        transition={{
          duration: 1,
          delay: 0.5,
          type: "spring",
        }}
        className="relative size-64 md:size-96"
      >
        <Image src="/vinyl.webp" alt="" fill loading="eager" />
      </motion.div>
    );
  }
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
