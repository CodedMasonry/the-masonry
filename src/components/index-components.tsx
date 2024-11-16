"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { buttonVariants } from "~/components/ui/button";

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
