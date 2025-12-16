"use client";

import Image from "next/image";
import { Container } from "./Container";
import { IBlockHero } from "@/types/api.types";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroButton = (variant: string) => {
  switch (variant) {
    case "secondary":
      return "outline";
    default:
      return "default";
  }
};

export default function HeroSection({
  id,
  tagline,
  headline,
  description,
  image,
  layout,
  button_group = [],
}) {
  console.info("HERO DESCRIPTION:", description);
  return (
    <section id={id} className="mb-10 bg-linear-to-b from-gray-50 to-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {tagline && <p className="tagline">{tagline}</p>}
            {headline && <h1 className="text-gray-900 mb-6">{headline}</h1>}
            {description && <p className="text-gray-600 mb-8">{description}</p>}

            {button_group.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {button_group.map((button, index) => (
                  <Button
                    asChild
                    key={index}
                    variant={button.variant || "default"}
                    size="lg"
                  >
                    <Link href={resolveButtonUrl(button)}>{button.label}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
          {(layout === "image_right" ||
            layout === "image_center" ||
            layout === null) &&
            image && (
              <div className="relative">
                <Image
                  className="rounded-lg shadow-2xl w-full"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${image.id}`}
                  alt={image.filename_download || "Hero Image"}
                  width={700}
                  height={350}
                  priority
                />
              </div>
            )}
        </div>
      </Container>
    </section>
  );
}

function resolveButtonUrl(button) {
  if (button.type === "page" && button.page) return `${button.page.permalink}`;
  if (button.type === "post" && button.post) return `/posts/${button.post.id}`;
  return button.url || "#";
}
