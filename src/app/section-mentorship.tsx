"use client";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function SectionMentorships() {
  return (
    <div className="ml-8 mr-4 mt-28 flex flex-col md:mx-36 md:mt-36">
      <h3 className="mb-2 text-3xl font-medium underline decoration-primary drop-shadow-lg md:-ml-4 md:text-4xl">
        I Like To Learn
      </h3>
      <p className="mt-2 drop-shadow-lg md:text-lg">
        So I engage in opportunites that allow me to expand my knowledge.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <GridItem
          href="/ypa"
          image="/icons/ypa.png"
          title="Young Professional Academy"
          subtitle="Dublin City Schools"
        />
        <GridItem
          href="/fstlogistics"
          image="/icons/fst.jpeg"
          title="IT Department Mentorship"
          subtitle="FST Logistics"
        />
      </div>
    </div>
  );
}

function GridItem({
  href,
  image,
  title,
  subtitle,
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="mt-4 flex flex-row rounded-xl border-2 border-transparent p-4 drop-shadow-lg transition hover:-translate-y-2 hover:border-primary"
    >
      <Image
        src={image}
        width={112}
        height={112}
        alt=""
        className="my-auto aspect-square size-28"
      />
      <div className="ml-4 flex flex-col items-start border-l-2 border-foreground pl-4 align-middle transition">
        <h4 className="text-3xl font-semibold">{title}</h4>
        <p className="text-lg">{subtitle}</p>
        <IconChevronRight stroke={3} className="mb-1 mt-auto size-6 self-end" />
      </div>
    </Link>
  );
}
