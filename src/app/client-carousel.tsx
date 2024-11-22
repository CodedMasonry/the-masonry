"use client";

import { motion } from "motion/react";
import { ImageCarousel } from "~/components/img-carousel";

export default function ClientCarousel({ images }: { images: Array<string> }) {
  // First Half of images
  const setOne = images.slice(0, images.length / 2);
  // Second half
  const setTwo = images.slice(images.length / 2, images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col"
    >
      <ImageCarousel images={setOne} direction="forward" />
      <ImageCarousel images={setTwo} direction="backward" />
    </motion.div>
  );
}
