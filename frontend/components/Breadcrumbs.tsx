"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

export const Breadcrumbs = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className="mb-4">
      <ul className="flex text-sm">
        {segments.map((segment, index) => (
          <li key={index}>
            <Link href={`/${segments.slice(0, index + 1).join("/")}`}>
              {`${segment}/`}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
