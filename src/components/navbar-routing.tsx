"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { IconExternalLink } from "@tabler/icons-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Resume",
    href: "/resume",
    description:
      "My current resume where you can get an overview of my skills.",
  },
  {
    title: "References",
    href: "/references",
    description:
      "An up to date list of references who can attest to my abilities.",
  },
  {
    title: "Young Professionals Academy",
    href: "/ypa",
    description: "An overview of the highschool mentorships I participated in",
  },
  {
    title: "IT Department Mentorship",
    href: "/docs/primitives/tabs",
    description: "A mentorship opportunity I had within an IT Department.",
  },
];

export function NavRouting() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Image
                src="/favicon.svg"
                alt="home"
                width={32}
                height={32}
                className="mr-2 size-8"
              />
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3 min-h-20">
                <NavigationMenuLink asChild>
                  <Link
                    className="group relative flex h-full w-full flex-col rounded-md ring-2 ring-transparent transition duration-150 hover:ring-primary"
                    href="/"
                  >
                    <Image
                      src="https://dxgc3f8f0p.ufs.sh/f/ou6rUxl7TzS4HQy0MizViDM9beH6tU8kSOrjF4s3clZCXVqK"
                      alt="Background Image"
                      fill
                      className="rounded-md"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="z-10 ml-2 mt-auto text-lg font-medium text-white drop-shadow-md">
                      Home
                    </div>
                    <IconExternalLink className="absolute bottom-2 right-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/photos" title="Photography">
                I love photography, so you can see the gallery here.
              </ListItem>
              <ListItem href="/stats" title="Statistics">
                A lot of numbers, all in one place, because why not.
              </ListItem>
              <ListItem href="https://github.com/CodedMasonry" title="Projects">
                Nothing here yet, so this just goes to my Github.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Professional</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/photos" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Gallery
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group relative block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none ring-2 ring-transparent transition-all hover:ring-primary focus:text-accent-foreground focus:ring-primary",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
          <IconExternalLink className="absolute bottom-2 right-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
