"use client";

import client from "@/lib/directus";
import { Partner } from "@/types/api.types";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "./Container";

type TickerProps = {
  id: string;
  headline: string;
  content: string;
  ticker_partners: Partner[];
  ticker_items: any[];
};

export default function Ticker({
  id,
  headline,
  content,
  ticker_partners,
  ticker_items,
}: TickerProps) {
  const [tickerPartners, setTickerPartners] = useState<Partner[]>([]);
  const duplications = tickerPartners.length < 5 ? 4 : 2;

  useEffect(() => {
    const fetchTickerPartners = async () => {
      try {
        const response = await client.request(
          readItems("partners", {
            filter: {
              featured: { _eq: true },
            },
          })
        );
        const expandedPartners = Array(duplications).fill(response).flat();
        setTickerPartners(expandedPartners);
        console.info("Ticker partners fetched:", expandedPartners);
      } catch (error) {
        console.error("Error fetching ticker partners:", error);
      }
    };

    fetchTickerPartners();
  }, []);

  if (!tickerPartners?.length) {
    return null;
  }

  return (
    <section id={id} className="mb-10">
      <Container>
        <div className="text-center mb-5">
          <h2 className="mb-4 text-2xl">{headline}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Container>

      <div className="py-5 bg-neutral-300/10 overflow-hidden">
        <Container>
          <ul className="flex animate-ticker hover:animate-paused gap-5">
            {tickerPartners.map((partner, index) => (
              <li
                key={`${partner.id}-${index}`}
                className="group flex items-center gap-2 shrink-0"
              >
                <Image
                  src={`http://localhost:8055/assets/${partner.logo}`}
                  alt=""
                  width={40}
                  height={40}
                  className="grayscale group-hover:grayscale-0 transition-colors duration-300"
                />
                <h3 className="group-hover:text-neutral-700 text-sm transition-colors duration-300">
                  {partner.name}
                </h3>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
