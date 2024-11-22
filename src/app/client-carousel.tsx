"use client";

import { ImageCarousel } from "~/components/img-carousel";

export default function ClientCarousel({ images }: { images: Array<string> }) {
  // First Half of images
  const setOne = images.slice(0, images.length / 2);
  // Second half
  const setTwo = images.slice(images.length / 2, images.length);

  return (
    <div className="flex w-full flex-col">
      <ImageCarousel images={setOne} direction="forward" />
      <ImageCarousel images={setTwo} direction="backward" />
    </div>
  );
}
