import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <Body />
    </div>
  );
}

function Header() {
  return (
    <div className="mx-8 mt-16 flex flex-col space-y-1">
      <h1 className="font-semibold text-4xl underline decoration-primary">
        Software Engineering Internship
      </h1>
      <Link href="https://fstlogistics.com/" className="w-fit hover:underline">
        <h2 className="text-2xl">Outcomes</h2>
      </Link>
      <p className="">Mentored with Marcus Larger, Justin Holderby</p>
      <p className="font-light italic">April 15 - May 9, 2025</p>
    </div>
  );
}

function Body() {
  return (
    <>
      <div className="mx-8 mt-8 flex flex-col">
        <p className="max-w-5xl">
          My high school offers a program called the Young Professionals Academy
          (YPA), which provides students with the opportunity to participate in
          two internships. For my second internship, I spent four weeks at
          Outcomes, a tech company specializing in pharmacy-centered software.
          My primary mentors were Marcus Larger and Justin Holderby, but I also
          collaborated closely with several other individuals within and outside
          their team. This was an immensely valuable experience, allowing me to
          see how my existing skills and knowledge translate to software
          engineering in a business environment. Additionally, I gained insight
          into the business aspects of software development and the role of
          leadership.
        </p>
        <p className="my-4 max-w-5xl">
          Having already spent years writing code, my mentors were aware of my
          background. So, the focus of this internship was to gain exposure to
          aspects of software engineering that I wouldn’t see unless I was in a
          business environment. There's a significant difference between writing
          code individually / with a small team and working with a larger team
          of engineers spanning multiple teams. While I can’t include every
          detail, I will share the most notable takeaways.
        </p>
        <h3 className="font-semibold text-2xl">Code At Scale</h3>
        <p className="my-4 max-w-5xl">
          During my time with the team at Outcomes, they provided a high-level
          overview of the company's systems. I learned that everything is
          designed for load balancing and high availability, a stark contrast to
          the purpose of a personal project. I was informed that the active
          codebases had over 50 million lines of code. This gave me a better
          understanding of why a single company often employs so many engineers.
          Working in a corporate environment is, naturally, quite different from
          personal projects.
        </p>

        <h3 className="font-semibold text-2xl">AGILE</h3>
        <p className="my-4 max-w-5xl">
          As a for-profit company, Outcomes has become highly efficient with its
          time. My mentor provided an in-depth explanation of AGILE methodology
          for development, which I found fascinating. The core principle of
          AGILE is efficiency, and much of the development process is structured
          around it. He also took the time to explain the importance of breaking
          down projects into smaller, achievable, and measurable tasks. These
          tasks are assigned point values, and I gained an understanding of
          their relative weights:
        </p>
        <ul>
          <li>
            <span className="font-bold">1 Point: </span> "We know how to fix
            this and can do so pretty quickly."
          </li>
          <li>
            <span className="font-bold">2 Points: </span> "We have an idea of
            how to fix it, and we can get it done somewhat quickly."
          </li>
          <li>
            <span className="font-bold">3 Points: </span> "This would likely
            take a decent amount of work / unsure how to do this."
          </li>
          <li>
            <span className="font-bold">5+ Points: </span> "Massive undertaking,
            no idea where to start" (significant red flags).
          </li>
        </ul>
        <p className="my-4 max-w-5xl">
          My mentor also drew a diagram illustrating AGILE, which I have
          attempted to recreate below. It summarizes what I learned about the
          methodology.
        </p>
        <div className="relative my-2 aspect-video max-w-2xl">
          <Image
            src="/images/agile.png"
            alt="Diagram of agile"
            className="rounded"
            fill
          />
        </div>

        <h3 className="mt-4 font-semibold text-2xl">leadership & Management</h3>
        <p className="my-4 max-w-5xl">
          With over 500 employees at Outcomes, I observed the significant value
          provided by managers and executives. Their role allows engineers to
          focus on their work while another group orchestrates the project
          details and the overall direction of the company, including setting
          priorities, managing goals, and ensuring smooth operations.
        </p>

        <h3 className="font-semibold text-2xl">Conclusion</h3>
        <p className="my-4 max-w-5xl">
          The most significant takeaway from this internship was gaining first
          hand insight into how a tech company operates. This was my first
          opportunity to see my passion applied in a professional setting, and
          it only strengthened my desire to pursue software engineering.
          Realistically, I could enter the field directly after high school. But
          I can do more. And that is my intention.
        </p>
        <p className="my-4 max-w-5xl">
          I would like to thank Brad Pearson for connecting me with Outcomes, to
          Marcus and Justin for their direct mentorship during my time there,
          and to all the incredible individuals I had the privilege of speaking
          with. This experience has influenced my decisions post-high school and
          has reinforced my passion for software engineering.
        </p>
      </div>
    </>
  );
}
