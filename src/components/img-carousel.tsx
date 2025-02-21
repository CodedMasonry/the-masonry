"use client";

import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { IconExternalLink } from "@tabler/icons-react";

export default function ImageCarousel({
  images,
  direction,
}: {
  images: Array<string>;
  direction?: "forward" | "backward";
}) {
  const plugin = React.useRef(
    AutoScroll({ speed: 0.5, direction: direction, startDelay: 100 }),
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="h-fit w-full"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {images.map((key, index) => (
          <CarouselItem
            key={index}
            className="group relative ml-2 aspect-video min-h-32 w-auto basis-1/2 rounded-lg md:min-h-36 md:basis-1/4"
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.play()}
          >
            <Link
              href={"/photos/" + key.split("/").pop()}
              prefetch={false}
              className="cursor-default"
            >
              <Image
                src={key}
                alt=""
                fill
                loading="lazy"
                className="aspect-video rounded-lg border-2 border-transparent transition-all group-hover:border-primary"
              />
            </Link>
            <IconExternalLink className="absolute bottom-2 right-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
