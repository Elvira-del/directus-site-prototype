"use client";

import client from "@/lib/directus";
import { IBlockTicker, IPartners } from "@/types/api.types";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import { Container } from "./Container";
import { useEffect, useState } from "react";

// const getTickerItems = async () => {
//   try {
//     const tickerPartners = await client.request(
//       readItems("partners", {
//         filter: {
//           featured: { _eq: true },
//         },
//       }),
//     );
//     const duplications = tickerPartners.length < 5 ? 4 : 2;
//     const expandedPartners = Array(duplications).fill(tickerPartners).flat();
//     return expandedPartners as IPartners[];
//   } catch (error) {
//     console.error("Error fetching ticker partners:", error);
//   }
// };

export default function TickerSection({ id, tagline, headline }) {
  // const tickerItems = await getTickerItems();
  const [tickerItems, setTickerItems] = useState([]);
  const duplications = tickerItems.length < 5 ? 4 : 2;
  const expandedPartners = Array(duplications).fill(tickerItems).flat();

  useEffect(() => {
    async function fetchItems() {
      const data = await client.request(
        readItems("partners", {
          fields: [
            "id",
            "title",
            "slug",
            "description",
            "logo",
            "featured",
          ] as const,
          filter: {
            featured: { _eq: true },
          },
        }),
      );
      setTickerItems(data);
    }

    fetchItems();
  }, []);

  console.info("tickerItems", tickerItems);

  if (!tickerItems?.length) {
    return null;
  }

  return (
    <section id={id} className="mb-10">
      <Container>
        <div className="text-center mb-5">
          {tagline && <p>{tagline}</p>}
          {headline && <h2 className="mb-4 text-2xl">{headline}</h2>}
        </div>
      </Container>

      <div className="py-5 bg-neutral-300/10 overflow-hidden">
        <Container>
          {tickerItems && (
            <ul className="flex animate-ticker hover:animate-paused gap-5">
              {expandedPartners.map((item, idx) => (
                <li
                  key={idx}
                  className="group flex items-center gap-2 shrink-0"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${item.logo}`}
                    alt=""
                    width={40}
                    height={40}
                    className="grayscale group-hover:grayscale-0 transition-colors duration-300"
                  />
                  <h3 className="group-hover:text-neutral-700 text-sm transition-colors duration-300">
                    {item.title}
                  </h3>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
    </section>
  );
}
