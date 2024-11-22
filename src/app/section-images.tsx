"use client"

import { motion } from "motion/react";
import { ImageCarousel } from "~/components/img-carousel";
import { utapi } from "~/server/uploadthing";

// Put in seperate file to allow lazy loading
export default async function SectionImages() {
  const images = await utapi
    .listFiles()
    .then((v) =>
      v.files.map((img) => "https://utfs.io/a/dxgc3f8f0p/" + img.key),
    );

  return (
    <div>
      <div id="photos" className="mb-8 ml-4 mr-4 mt-28 md:ml-36 md:mt-32">
        <h3 className="text-4xl font-medium underline decoration-primary drop-shadow-lg md:-ml-4">
          Photos expresses a mood in a snapshot of time.
        </h3>
        <p className="mt-2 text-lg drop-shadow-lg">
          The ability to represent a moment, a setting, an emotion is what
          inspires me to take them.
        </p>
      </div>
      <ClientCarousel images={images} />
    </div>
  );
}

function ClientCarousel({ images }: { images: Array<string> }) {
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