import client from "@/lib/directus";
import { IBlockTicker, IPartners } from "@/types/api.types";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import { Container } from "./Container";

const getTickerPartners = async () => {
  try {
    const tickerPartners = await client.request(
      readItems("partners", {
        filter: {
          featured: { _eq: true },
        },
      }),
    );
    const duplications = tickerPartners.length < 5 ? 4 : 2;
    const expandedPartners = Array(duplications).fill(tickerPartners).flat();
    return expandedPartners as IPartners[];
  } catch (error) {
    console.error("Error fetching ticker partners:", error);
  }
};

export default async function Ticker({
  id,
  headline,
  content,
  ticker_partners,
  ticker_items,
}: IBlockTicker) {
  const tickerPartners = await getTickerPartners();

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
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${partner.logo}`}
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
