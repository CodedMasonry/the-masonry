import { ChevronRight, ExternalLink } from "lucide-react";

export default function SectionHighSchool() {
  <div className="mx-8 mt-28 flex flex-col md:mx-36 md:mt-36">
    <h3 className="mb-2 text-3xl underline decoration-primary drop-shadow-lg md:text-4xl">
      What I've done in High School
    </h3>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <HighSchoolGridItem
        href="/experiences/ypa"
        image="/icons/ypa.png"
        title="Young Professional Academy"
        subtitle="Dublin City Schools"
      />
      <HighSchoolGridItem
        href="/experiences/outcomes"
        image="/icons/outcomes.png"
        title="Software Engineering Internship"
        subtitle="Outcomes"
      />
      <HighSchoolGridItem
        href="https://www.dublinroboticsboosters.org/"
        image="/icons/team1014.jpeg"
        title="Robotics Team"
        subtitle="Team 1014, Bad Robots"
        external
      />
      <HighSchoolGridItem
        href="/experiences/fstlogistics"
        image="/icons/fst.jpeg"
        title="IT Department Internship"
        subtitle="FST Logistics"
      />
    </div>
  </div>;
}

function HighSchoolGridItem({
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
    <a
      href={href}
      className="group hover:-translate-y-2 mt-4 flex flex-row rounded-xl border-2 border-transparent p-4 drop-shadow-lg transition cursor-default hover:border-primary"
    >
      <img
        src={image}
        alt=""
        className="my-auto aspect-square size-24 md:size-28"
      />
      <div className="ml-4 flex w-full flex-col items-start border-foreground border-l-2 pl-4 align-middle transition">
        <h4 className="w-full font-semibold text-xl md:text-2xl lg:text-3xl">
          {title}
        </h4>
        <p className="md:text-lg">{subtitle}</p>
        {external ? (
          <ExternalLink className="mt-auto mb-1 size-6 self-end group-hover:stroke-primary transition" />
        ) : (
          <ChevronRight className="mt-auto mb-1 size-6 self-end group-hover:stroke-primary transition" />
        )}
      </div>
    </a>
  );
}
