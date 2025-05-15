"use client";
import { IconChevronRight, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function SectionLearning() {
  return (
    <div className="mx-8 mt-28 flex flex-col md:mx-36 md:mt-36">
      <h3 className="md:-ml-4 mb-2 font-medium text-3xl underline decoration-primary drop-shadow-lg md:text-4xl">
        What I've done in High School
      </h3>
      <p className="mt-2 drop-shadow-lg md:text-lg">
        I attended Dublin Coffman High School, where I had great experiences.
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <GridItem
          href="/ypa"
          image="/icons/ypa.png"
          title="Young Professional Academy"
          subtitle="Dublin City Schools"
        />
        <GridItem
          href="/outcomes"
          image="/icons/outcomes.png"
          title="Software Engineering Internship"
          subtitle="Outcomes"
        />
        <GridItem
          href="https://1014.brockshaffer.dev/"
          image="/icons/team1014.jpeg"
          title="Robotics Team"
          subtitle="Team 1014, Bad Robots"
          external
        />
        <GridItem
          href="/fstlogistics"
          image="/icons/fst.jpeg"
          title="IT Department Internship"
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
  external,
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
  external?: boolean | null;
}) {
  return (
    <Link
      href={href}
      className="group hover:-translate-y-2 mt-4 flex flex-row rounded-xl border-2 border-transparent p-4 drop-shadow-lg transition hover:border-primary"
    >
      <Image
        src={image}
        width={112}
        height={112}
        alt=""
        className="my-auto aspect-square size-24 md:size-28"
      />
      <div className="ml-4 flex w-full flex-col items-start border-foreground border-l-2 pl-4 align-middle transition">
        <h4 className="w-full font-semibold text-2xl md:text-3xl">{title}</h4>
        <p className="md:text-lg">{subtitle}</p>
        {external ? (
          <IconExternalLink
            stroke={2}
            className="mt-auto mb-1 size-6 self-end group-hover:stroke-primary transition"
          />
        ) : (
          <IconChevronRight
            stroke={3}
            className="mt-auto mb-1 size-6 self-end group-hover:stroke-primary transition"
          />
        )}
      </div>
    </Link>
  );
}
