"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Container } from "./Container";
import { Button } from "./ui/button";

export const Header = ({ navigation }) => {
  const headerNavigation = navigation.filter(
    (nav) => nav.title === "Main Navigation",
  )[0];

  if (!headerNavigation || headerNavigation.items?.length === 0) {
    return null;
  }

  console.info("HEADER NAVIGATION ITEMS:", headerNavigation.items);

  return (
    <header className="bg-white shadow-md">
      <Container>
        <div className="flex items-center justify-between py-5">
          <Button
            asChild
            variant="link"
            className="text-gray-900 transition-colors "
          >
            <Link href="/">Home</Link>
          </Button>

          <NavigationMenu className="hidden md:flex items-center gap-8">
            <NavigationMenuList className="flex gap-4">
              {headerNavigation.items.map((item) => {
                return item.type === "group" ? (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {item.children.map((child) => (
                        <NavigationMenuLink key={child.id} asChild>
                          <Link
                            href={resolveItemUrl(child)}
                            target={
                              child.target === "_blank" ? "_blank" : undefined
                            }
                            rel={
                              child.target === "_blank"
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {child.title}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={resolveItemUrl(item)}
                        target={item.target === "_blank" ? "_blank" : undefined}
                        rel={
                          item.target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </Container>
    </header>
  );
};

function resolveItemUrl(item) {
  if (item.type === "page" && item.page) {
    return `${item.page.permalink}`;
  }
  if (item.type === "post" && item.post) {
    return `/blog/${item.post}`;
  }
  if (item.type === "url" && item.url) {
    return item.url;
  }
  return "#";
}
