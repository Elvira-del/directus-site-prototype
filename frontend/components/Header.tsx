import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

const navLinks = [
  { label: "About Company", slug: "/" },
  { label: "Blog", slug: "blog" },
  { label: "Partners", slug: "partners" },
  { label: "Documentation", slug: "docs" },
  { label: "Solutions", slug: "solutions" },
];

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto my-0">
        <div className="flex items-center justify-between py-5">
          <div>
            <Link href="/">Home</Link>
          </div>
          <ul className="flex gap-4">
            {navLinks.map((link) => (
              <NavigationMenu key={link.slug}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink asChild>
                        <Link href={`/${link.slug}`}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
