import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

// Dublin green: #006853
export default async function Page() {
  return (
    <>
      <Header />
      <About />
      <AboutNarrative />
      <AboutYPA />
    </>
  );
}

function Header() {
  return (
    <div className="mx-8 mt-16 flex flex-col">
      <Image
        src="/icons/dcs.png"
        width={128}
        height={112}
        alt="Dublin City School's Logo"
        className="aspect-auto"
      />
      <h1 className="text-5xl font-bold text-[#006853]">
        Young Professionals Academy
      </h1>
      <div className="mt-2 grid max-w-4xl grid-cols-2 md:grid-cols-6">
        <p className="italic">Spring, 2025</p>
        <p className="italic">Dublin City Schools</p>
      </div>
      <p className="mt-2 max-w-4xl bg-muted/30 text-lg">
        During my junior year in highschool I tried taking a program called IT
        Academy. I decided halfway through the semester to drop the class
        because I knew the contents of the class, and decided to pick up Young
        Professionals Academy for my second semester. It was one of the greatest
        decisions I have made.
      </p>
    </div>
  );
}

function About() {
  return (
    <div className="mx-8 mt-16 flex flex-col">
      <h2 className="text-3xl font-bold underline decoration-[#006853]">
        Who Am I?
      </h2>
      <p className="mt-2 max-w-4xl text-lg">
        To give you a rough idea, I created a branding board.
      </p>
      <div className="group relative aspect-video w-full">
        <Image
          src="https://hz2lv8281m.ufs.sh/f/v97wqiBL7HaNf3u7v0Pq0gtkDfMGlmTpwK42cP76vrUxEWzL"
          alt="Branding Board covering details of who I am"
          fill
          className="aspect-video"
        />
      </div>
    </div>
  );
}

function AboutNarrative() {
  return (
    <div className="mx-8 mt-16 flex flex-col">
      <h2 className="text-3xl font-bold underline decoration-[#006853]">
        If you want to know my history
      </h2>
      <p className="mt-2 max-w-4xl text-lg">
        I wrote a short narrative about what lead to where I am today.
      </p>
      <Link href="/personal-narrative" className="mt-2">
        <Button size="lg" className="bg-[#006853] hover:bg-[#008158]">
          Read The Narrative
          <IconArrowRight />
        </Button>
      </Link>
    </div>
  );
}

function AboutYPA() {
  return (
    <div className="mt-16 flex flex-col bg-muted/30 px-8 md:text-lg">
      <h2 className="text-3xl font-bold underline decoration-[#006853]">
        What Is YPA?
      </h2>
      <p className="mt-4 max-w-7xl">
        Dublin City Schools’ Young Professionals Academy (YPA) is a program
        committed to providing work- based learning opportunities for high
        school juniors and seniors. Work-based learning (WBL) is a coordinated
        sequence of experiences designed to provide students with real-world
        learning through partnerships with local business and industry
        professionals. These learning activities help students explore careers
        and choose an appropriate career path. Research has shown that WBL helps
        business by providing positive promotion for your company in the
        community, long-term workforce development, and exceptional employee
        productivity. Businesses also have discovered, recruited, and eventually
        hired employees through WBL internships.
      </p>
      <p className="mt-4 max-w-7xl">
        Students participating in our program have applied, had their grades and
        attendance records reviewed, and came with several recommendations prior
        to their acceptance. These highly motivated and capable young men and
        women need internship mentors in order to help continue to develop their
        future-ready-skills through work-based learning opportunities.
      </p>
      <p className="mt-4 max-w-7xl">
        While enrolled in YPA, students are instructed in career research and
        preparation, communication skills, problem solving, teamwork, and the
        soft skills many companies are seeking in their employees. Students
        develop cover letters, resumes, and other resources to market themselves
        and their skills. Students are placed at worksites and businesses based
        upon their career interests and aptitudes. Throughout this educational
        partnership, students experience a plethora of job activities in various
        departments, often interacting with several different employees or
        working solely with one individual. Each student is required to complete
        research, observations, interviews, and participate in projects and
        tasks while at each internship in coordination with their mentor(s)
        needs and schedules. Our work-based learning experiences involve the
        following:
      </p>
      <ul className="ml-4 mt-4 max-w-6xl list-disc space-y-2">
        <li>
          Six-week educational mentorship experiences in either in the fall or
          the spring semesters of the school year
        </li>
        <li>
          Student will present mentor(s) with an agency mentorship agreement,
          emergency forms, resumes, and informational forms prior to starting
          their educational partnership
        </li>
        <li>
          Student and mentor(s) discuss learning goals and expectations during
          initial interviews/meetings
        </li>
        <li>
          Mentor(s) and students develop a schedule of three to four time
          periods per week for a minimum of six hours per week for a total of 35
          to 36 hours per six-week internship. There is flexibility as the
          quality of the partnership is more important than just achieving a
          total number of hours
        </li>
        <li>Mentors are asked to sign off on student time logs each week</li>
        <li>
          Mentors share individual and company expectations and opportunities
          with the student throughout the internship
        </li>
        <li>
          Mentors are asked to perform or coordinate a short, mock interview for
          the student during the internship
        </li>
        <li>
          Our YPA mentorships are educational learning opportunities; therefore,
          students are not considered employees in respect to worker&rsquo;s
          compensation or other fair labor laws as they are earning academic
          credits during this work-based learning experience
        </li>
      </ul>
    </div>
  );
}
