import Hero from "../../components/Hero";
import CardGroup from "../../components/CardGroup";
import RichText from "../../components/RichText";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Ticker from "../../components/Ticker";
import Features from "@/components/Features";

const blockToComponent = (collectionName) => {
  switch (collectionName) {
    case "block_hero":
      return Hero;
    case "block_richtext":
      return RichText;
    case "block_cardgroup":
      return CardGroup;
    case "block_ticker":
      return Ticker;
    case "block_features":
      return Features;
    default:
      return null;
  }
};

export default async function Page({ params }) {
  const { slug } = await params;

  const page = await client.request(
    readItems("pages", {
      filter: {
        slug: { _eq: slug },
      },
      fields: [
        "title",
        "slug",
        "blocks.id",
        "blocks.collection",
        "blocks.item.*",
        "blocks.item.posts.*.*",
        "blocks.item.cards.*.*",
        "blocks.item.ticker_items.*",
        "blocks.item.ticker_items.*.*",
        "blocks.item.ticker_partners.id",
        "blocks.item.ticker_partners.partners_id.id",
        "blocks.item.ticker_partners.partners_id.name",
        "blocks.item.ticker_partners.partners_id.logo",
        "blocks.item.ticker_partners.partners_id.featured",
        "blocks.item.released_features.*.*"
      ],
      limit: 1,
    })
  );

  console.info("Page data:", page);

  return (
    <div>
      <h1 className="text-3xl font-bold">{page[0].title}</h1>
      {page[0]?.blocks?.map((block, index) => {
        const Component = blockToComponent(block.collection);
        return <Component key={index} {...block.item} />;
      })}
    </div>
  );
}
