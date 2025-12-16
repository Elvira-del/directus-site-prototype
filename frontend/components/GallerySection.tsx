"use client";

import Image from "next/image";
import { Container } from "./Container";

export default function GallerySection({ id, tagline, headline, items = [] }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mb-10" id={id}>
      <Container>
        {tagline && <p>{tagline}</p>}
        {headline && <h2>{headline}</h2>}

        <div>
          {items.map((item, index) => (
            <div key={index}>
              {item.directus_file?.id && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${item.directus_file.id}`}
                  alt={item.directus_file.filename_download || "Gallery image"}
                  width={400}
                  height={300}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
