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

const navLinks = [
  { label: "About Company", slug: "/" },
  { label: "Blog", slug: "blog" },
  { label: "Partners", slug: "partners" },
  { label: "Documentation", slug: "docs" },
  { label: "Solutions", slug: "solutions" },
];

export const Header = ({ navigation }) => {
  const headerNavigation = navigation.filter(
    (nav) => nav.title === "Main Navigation",
  )[0];

  if (!headerNavigation || headerNavigation.items?.length === 0) {
    return null;
  }

  return (
    <header className="bg-white shadow-md">
      <Container>
        <div className="flex items-center justify-between py-5">
          <div>
            <Link href="/">Home</Link>
          </div>
          <ul className="flex gap-4">
            {headerNavigation.items.map((item) => (
              <NavigationItem key={item.id} item={item} />
            ))}
            {/* {navLinks.map((link) => ( */}
            {/* //           <NavigationMenu key={link.slug}>
    //             <NavigationMenuList>
    //               <NavigationMenuItem>
    //                 <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
    //                 <NavigationMenuContent>
    //                   <NavigationMenuLink asChild>
    //                     <Link href={`/${link.slug}`}>{link.label}</Link>
    //                   </NavigationMenuLink>
    //                 </NavigationMenuContent>
    //               </NavigationMenuItem>
    //             </NavigationMenuList>
    //           </NavigationMenu>
    //         ))} */}
          </ul>
        </div>
      </Container>
    </header>
  );
};

// Recursive navigation item renderer
function NavigationItem({ item }) {
  if (item.type === "group") {
    return item.children?.map((child) => (
      <NavigationItem key={child.id} item={child} />
    ));
  }

  return (
    <div>
      <Link
        href={resolveItemUrl(item)}
        target={item.target === "_blank" ? "_blank" : undefined}
        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {item.title}
      </Link>
    </div>
  );
}

// Helper to resolve link destination properly
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
