import type React from "react";
import { NavBarMenu } from "./navbar-component";

export type NavItem = {
  title: string;
  href: string;
  star: boolean;
  description: string;
  icon?: React.Component;
};

// Personal section on Public page
const PersonalSection: NavItem[] = [
  {
    title: "Photography",
    href: "/photos",
    star: false,
    description: "I love photography, so you can see the gallery here.",
  },
  {
    title: "Projects",
    href: "https://github.com/CodedMasonry",
    star: false,
    description: "Nothing here yet, so this just goes to my Github.",
  },
  {
    title: "Blog",
    href: "/",
    star: false,
    description: "Nothing here yet, this will end up being a blog soon.",
  },
];

// Professional section on Public page
const ProfessionalSection: NavItem[] = [
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
    href: "/experiences/ypa",
    star: false,
    description: "An overview of the highschool mentorships I participated in",
  },
  {
    title: "Software Engineering Internship",
    href: "/experiences/outcomes",
    star: false,
    description: "An internship I had with a tech company.",
  },
  {
    title: "IT Department Internship",
    href: "/experiences/fstlogistics",
    star: false,
    description: "An internship I had with an IT Department.",
  },
  {
    title: "Team Bad Robots",
    href: "https://www.dublinroboticsboosters.org/",
    star: false,
    description: "The FRC team I'm currently a part of in high school.",
  },
];

export function NavBar() {
  return (
    <div className="absolute flex w-full items-center p-4 z-20">
      <div className="ml-4">
        <NavBarMenu
          personal={PersonalSection}
          professional={ProfessionalSection}
        />
      </div>
      <div className="mr-2 ml-auto flex"></div>
    </div>
  );
}
