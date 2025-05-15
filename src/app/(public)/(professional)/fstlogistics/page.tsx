import { IconExternalLink } from "@tabler/icons-react";
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
        IT Department Internship
      </h1>
      <Link
        href="https://fstlogistics.com/"
        className="flex w-fit items-center hover:text-primary"
      >
        <h2 className="text-2xl">FST Logistics</h2>
        <IconExternalLink className="ml-2" />
      </Link>
      <p className="">Mentored With Andrew O’Brien, Kamaria Banks</p>
      <p className="font-light italic">January 28 - March 7, 2025</p>
    </div>
  );
}

function Body() {
  return (
    <>
      <div className="mx-8 mt-8 flex flex-col md:flex-row">
        <div>
          <p className="max-w-4xl">
            Through a program at my high school, known as Young Professionals
            Academy (YPA), I had the opportunity to engage in a six week
            internship program. I interned at a company called FST Logistics; a
            company centered around temperature controlled shipping across the
            United States. There, my main mentors were Andrew O’brien and
            Kamaria Banks, but I interacted and spoke with several other
            individuals across the Technology Solutions Group (TSG). Anyone
            who’s job revolved around technology joined TSG; think programmers
            and helpdesk. Every week I got an opportunity to speak with
            different people and gain an insight into their daily lives. It
            helped me see how important each person is to keep the business
            running.
          </p>
          <p className="mt-8 max-w-4xl">
            The focus of my internship was to improve on my soft skills, as I
            already possess most of the technical skills I would need to work in
            an IT environment. I learned the importance of communication during
            my time. In terms of interacting with someone in the role of user
            support, how you spoke to them, whether email or in person, leaves a
            lasting impression. When it comes to tech support, you want people
            to be willing to reach out to IT, and to have a positive experience
            with it. When it came to one-on-one conversations I had with people
            in TSG, being able to keep a running conversation was incredibly
            important. Being able to adapt a conversation to the person was a
            valuable skill I learned. My mentors gave me an honest experience of
            the job; from the slow days with nothing to do, to my last week
            where everyone was slammed trying to do a company-wide password
            reset practically overnight.
          </p>
        </div>
        <div className="mx-auto mt-8 min-w-72 md:mt-0 md:ml-16 md:min-w-96">
          <Image
            src="/images/fst_truck.jpg"
            alt="FST Logistics Truck"
            width={384}
            height={384}
            className="aspect-auto size-72 rounded-xl shadow-lg md:size-96"
          />
          <p className="mt-1 text-center text-sm">
            Photo of a truck from FST Logistics
          </p>
        </div>
      </div>
      <div className="mx-8 mt-8 flex flex-col md:flex-row">
        <div>
          <p className="max-w-6xl">
            The focus of my internship was to improve on my soft skills, as I
            already possess most of the technical skills I would need to work in
            an IT environment. I learned the importance of communication during
            my time. In terms of interacting with someone in the role of user
            support, how you spoke to them, whether email or in person, leaves a
            lasting impression. When it comes to tech support, you want people
            to be willing to reach out to IT, and to have a positive experience
            with it. When it came to one-on-one conversations I had with people
            in TSG, being able to keep a running conversation was incredibly
            important. Being able to adapt a conversation to the person was a
            valuable skill I learned. My mentors gave me an honest experience of
            the job; from the slow days with nothing to do, to my last week
            where everyone was slammed trying to do a company-wide password
            reset practically overnight.
          </p>
          <p className="mt-8 max-w-6xl">
            The internship helped me realize I am on the right path, but I want
            to focus on a software development role. I met the software
            engineers at FST Logistics, and they work somewhat isolated from
            each other, working on separate projects. I hope to find a
            internship centered around a larger development team where I can see
            how collaboration works in software development, as that is the role
            I am aiming for. I intend to go to University and get a Computer
            Science degree to at the very least make connections, but mainly
            push my knowledge further so I gain a better grasp on complex
            systems.
          </p>
          <p className="mt-8 max-w-6xl">
            I genuinely want to thank FST Logistics and everyone in the
            Technology Solution Group for allowing me to partake in this
            incredible opportunity. It helped me learn about myself, and about
            the professional space. It is much better than a classroom.
          </p>
        </div>
        <div className="mx-auto mt-8 min-w-72 md:mt-0 md:ml-16 md:min-w-96">
          <Image
            src="/drawings/speaking.png"
            alt=""
            width={384}
            height={384}
            className="aspect-auto size-72 rounded-xl drop-shadow-lg md:size-96"
          />
          <p className="text-end text-sm">
            Illustration of me speaking with people in TSG
          </p>
        </div>
      </div>
    </>
  );
}
