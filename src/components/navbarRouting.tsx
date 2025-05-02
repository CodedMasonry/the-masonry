"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { IconExternalLink, IconStarFilled } from "@tabler/icons-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";

export function NavbarMenu({
  components,
}: {
  components: {
    title: string;
    href: string;
    star: boolean;
    description: string;
  }[];
}) {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className={`cursor-default bg-transparent ${navigationMenuTriggerStyle()}`}
          >
            <Image
              src="/favicon.svg"
              alt=""
              width={32}
              height={32}
              className={`size-6 ${!isMobile && "mr-2"}`}
            />
            {!isMobile && "Home"}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
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
                    <div className="z-10 mt-auto ml-2 font-medium text-lg text-white drop-shadow-md">
                      Home
                    </div>
                    <IconExternalLink className="absolute right-2 bottom-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
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
          <NavigationMenuTrigger className="bg-transparent">
            Professional
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  star={component.star}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {!isMobile && (
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/photos"
              className={`cursor-default bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Gallery
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { star?: boolean }
>(({ className, title, star = false, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group relative block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden ring-2 ring-transparent transition-all hover:ring-primary focus:text-accent-foreground focus:ring-primary",
            className,
          )}
          {...props}
        >
          <div className="font-medium text-sm leading-none">
            {title}
            {star && (
              <IconStarFilled className="ml-1 inline size-3 fill-yellow-400" />
            )}
          </div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
          <IconExternalLink className="absolute right-2 bottom-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
