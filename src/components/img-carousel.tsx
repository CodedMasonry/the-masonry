"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";

export function ImageCarousel({
  images,
  direction,
}: {
  images: Array<string>;
  direction?: "forward" | "backward";
}) {
  const plugin = React.useRef(AutoScroll({ speed: 0.5, direction: direction }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="h-fit w-full border"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
      opts={{ loop: true }}
    >
      <CarouselContent className="-ml-4">
        {images.map((key, index) => (
          <CarouselItem key={index} className="basis-1/4 pl-1">
              <Image
                src={key}
                alt=""
                width={682}
                height={384}
                loading="lazy"
                className="shadow-lg"
              />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
