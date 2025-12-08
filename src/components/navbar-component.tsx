import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ExternalLink, Star } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  star: boolean;
  description: string;
  icon?: any;
};

export function NavBarMenu({
  personal,
  professional,
  heroImageSrc,
}: {
  personal: NavItem[];
  professional: NavItem[];
  heroImageSrc: string;
}) {
  return (
    <NavigationMenu className="bg-background/30 rounded-lg py-1 px-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`flex flex-row items-center cursor-default ${navigationMenuTriggerStyle()} bg-trasparent`}
          >
            <a href="/">
              <img
                src="/favicon.svg"
                alt=""
                width={24}
                height={24}
                className="md:mr-2"
              />
              <span className="hidden md:inline">Home</span>
            </a>
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
                  <a
                    className="group relative flex h-full w-full flex-col rounded-md ring-2 ring-transparent transition duration-300 hover:ring-primary"
                    href="/"
                  >
                    <img
                      src={heroImageSrc}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-md object-cover opacity-0 transition-opacity duration-300 ease-in-out"
                      onLoad={(e) => {
                        e.currentTarget.classList.remove("opacity-0");
                        e.currentTarget.classList.add("opacity-100");
                      }}
                    />
                    <div className="z-10 mt-auto ml-2 font-medium text-lg text-white drop-shadow-[0_3px_2px_rgba(0,0,0,1)]">
                      Home
                    </div>
                    <ExternalLink className="absolute right-2 bottom-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                  </a>
                </NavigationMenuLink>
              </li>
              {personal.map((component) => (
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
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Professional
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {professional.map((component) => (
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
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink
            asChild
            className={`cursor-default ${navigationMenuTriggerStyle()} bg-trasparent`}
          >
            <a href="/photos">Gallery</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = ({
  title,
  href,
  star = false,
  children,
}: {
  title: string;
  href: string;
  star?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="group relative block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden ring-2 ring-transparent transition-all hover:ring-primary focus:text-accent-foreground focus:ring-primary"
        >
          <div className="font-medium text-sm leading-none">
            {title}
            {star && (
              <Star className="ml-1 inline size-3 fill-yellow-400 stroke-0" />
            )}
          </div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
          <ExternalLink className="absolute right-2 bottom-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
        </a>
      </NavigationMenuLink>
    </li>
  );
};
