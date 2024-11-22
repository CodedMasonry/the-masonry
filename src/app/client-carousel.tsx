"use client";

import { ImageCarousel } from "~/components/img-carousel";

export default function ClientCarousel({ setOne, setTwo }: { setOne: Array<string>, setTwo: Array<string> }) {

  return (
    <div className="flex w-full flex-col">
      <ImageCarousel images={setOne} direction="forward" />
      <ImageCarousel images={setTwo} direction="backward" />
    </div>
  );
}
