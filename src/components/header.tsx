import type React from "react";
import { HeaderMenu } from "./header-routing";

type ProfessionalItem = {
  title: string;
  href: string;
  star: boolean;
  description: string;
  icon?: React.Component;
};

// Professional section on Public page
const ProfessionalSection: ProfessionalItem[] = [
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

export function Header() {
  return (
    <div className="flex w-full items-center p-4">
      <div className="ml-4">
        <HeaderMenu components={ProfessionalSection} />
      </div>
      <div className="mr-2 ml-auto flex"></div>
    </div>
  );
}
