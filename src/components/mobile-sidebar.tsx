"use client";

import type * as React from "react";
import {
  Phone,
  Briefcase,
  FolderKanban,
  Building2,
  Star,
  LogIn,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import { useIsMobile } from "~/hooks/use-mobile";
import Image from "next/image";
import {
  IconArticleFilled,
  IconBolt,
  IconClipboard,
  IconDeviceLaptop,
  IconHomeFilled,
  IconInfoCircle,
  IconPhotoFilled,
  IconStarFilled,
  IconUserCheck,
} from "@tabler/icons-react";
import { type ProfessionalItem } from "~/lib/routing";
import { cn } from "~/lib/utils";

export function MobileSidebar({
  professionalItems,
}: {
  professionalItems: ProfessionalItem[];
}) {
  const isMobile = useIsMobile();

  // Only designed for mobile use
  if (!isMobile) {
    return <></>;
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-2 rounded-lg p-2 transition-all hover:bg-sidebar-accent">
          <Link href="/" className="flex w-full items-center gap-2">
            <div className="flex aspect-square size-10 items-center justify-center">
              <Image
                src="/favicon.svg"
                alt=""
                width={40}
                height={40}
                className="size-10"
              />
            </div>
            <span className="text-lg font-semibold">Brock Shaffer</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* About Section */}
        <SidebarGroup>
          <SidebarGroupLabel>About</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Home" size="lg">
                <Link href="/">
                  <IconHomeFilled className="size-6" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Photography" size="lg">
                <Link href="/photos">
                  <IconPhotoFilled className="size-6" />
                  <span>Photography</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Blog" size="lg">
                <Link href="/blog">
                  <IconArticleFilled className="size-6" />
                  <span>Blog</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Projects" size="lg">
                <Link href="https://github.com/CodedMasonry">
                  <Image
                    src="/icons/github.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 dark:invert"
                  />
                  <span>Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Professional Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Professional</SidebarGroupLabel>
          <SidebarMenu>
            {professionalItems.map((item) => {
              // Choose icon based on the item title
              let ItemIcon;
              switch (item.title) {
                case "Resume":
                  ItemIcon = <IconClipboard className="size-6" />;
                  break;
                case "References":
                  ItemIcon = <IconUserCheck className="size-6" />;
                  break;
                case "Young Professionals Academy":
                  ItemIcon = <GraduationCap className="size-6" />;
                  break;
                case "IT Department Mentorship":
                  ItemIcon = <IconDeviceLaptop className="size-6" />;
                  break;
                case "Strength Finder":
                  ItemIcon = <IconBolt className="size-6" />;
                  break;
                default:
                  ItemIcon = <IconInfoCircle className="size-6" />;
              }

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.description}
                    size="lg"
                    className={cn(item.star && "font-medium")}
                  >
                    <Link href={item.href}>
                      {ItemIcon}
                      <span>{item.title}</span>
                      {item.star && (
                        <IconStarFilled className="ml-auto size-4 text-yellow-500" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2">
          <Button
            className="w-full justify-start gap-2"
            size="lg"
            variant="outline"
          >
            <LogIn className="size-5" />
            <span>Login</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
