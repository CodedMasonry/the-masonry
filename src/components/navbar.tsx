"use client";

import { ModeToggle } from "./mode-toggle";
import { NavbarMenu } from "./navbarRouting";

const components: {
  title: string;
  href: string;
  star: boolean;
  description: string;
}[] = [
  {
    title: "Resume",
    href: "/resume",
    star: true,
    description:
      "My current resume where you can get an overview of my skills.",
  },
  {
    title: "References",
    href: "/references",
    star: true,
    description:
      "An up to date list of references who can attest to my abilities.",
  },
  {
    title: "Young Professionals Academy",
    href: "/ypa",
    star: false,
    description: "An overview of the highschool mentorships I participated in",
  },
  {
    title: "IT Department Mentorship",
    href: "/fstlogistics",
    star: false,
    description: "A mentorship opportunity I had within an IT Department.",
  },
  {
    title: "Strength Finder",
    href: "/ypa/strengths",
    star: false,
    description: "My top 5 strengths according Clifton Strengths",
  },
];

export function Navbar() {
  return (
    <div className="absolute flex w-full items-center p-2">
      <div className="ml-4">
        <NavbarMenu components={components} />
      </div>
      <div className="ml-auto mr-2 flex">
        <ModeToggle />
      </div>
    </div>
  );
}
