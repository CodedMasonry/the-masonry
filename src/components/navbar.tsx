"use client";

import React from "react";
import { ModeToggle } from "./mode-toggle";
import { NavbarMenu } from "./navbarRouting";

export type ProfessionalItem = {
  title: string;
  href: string;
  star: boolean;
  description: string;
  icon?: React.Component;
};

// Professional section on Public page
export const ProfessionalSection: ProfessionalItem[] = [
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
    title: "Software Engineering Internship",
    href: "/outcomes",
    star: false,
    description: "An internship I had with a tech company.",
  },
  {
    title: "IT Department Internship",
    href: "/fstlogistics",
    star: false,
    description: "An internship I had with an IT Department.",
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
        <NavbarMenu components={ProfessionalSection} />
      </div>
      <div className="mr-2 ml-auto flex">
        <ModeToggle />
      </div>
    </div>
  );
}
