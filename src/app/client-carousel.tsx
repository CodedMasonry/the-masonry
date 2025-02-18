"use client";

import ImageCarousel from "~/components/img-carousel";

export default function ClientCarousel({
  setOne,
  setTwo,
}: {
  setOne: Array<string>;
  setTwo: Array<string>;
}) {
  console.log(setOne)
  return (
    <div className="flex w-full flex-col space-y-2">
      <ImageCarousel images={setOne} direction="forward" />
      <ImageCarousel images={setTwo} direction="backward" />
    </div>
  );
}
