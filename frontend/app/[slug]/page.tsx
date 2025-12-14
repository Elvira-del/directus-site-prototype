import Hero from "../../components/Hero";
import CardGroup from "../../components/CardGroup";
import RichText from "../../components/RichText";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Ticker from "../../components/Ticker";
import Features from "@/components/Features";
import { Schema } from "@/types/api.types";

const getPageBySlug = async (slug: string) => {
  const page = await client.request(
    readItems("pages", {
      filter: {
        slug: { _eq: slug },
      },
      fields: [
        "title",
        "slug",
        {
          blocks: [
            "*",
            {
              item: {
                block_cardgroup: [
                  "*",
                  "cards",
                  {
                    posts: [
                      "*",
                      {
                        posts_id: ["*"],
                        block_cardgroup_id: ["*"],
                      },
                    ],
                  },
                ],
                block_features: ["*"],
                block_hero: ["*"],
                block_richtext: ["*"],
                block_ticker: ["*"],
              },
            },
            "pages_id",
          ],
        },
      ] as const,
      limit: 1,
    }),
  );

  return page;
};

export type TPage = Awaited<ReturnType<typeof getPageBySlug>>;
export type TPageBlock = NonNullable<TPage[number]["blocks"]>[number];
type CollectionKey = keyof Schema;

export function isBlockOf<TCollection extends CollectionKey>(
  block: TPageBlock,
  collection: TCollection,
): block is TPageBlock & {
  collection: TCollection;
  item: Schema[TCollection][number];
} {
  return block.collection === collection;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  return (
    <div>
      <h1 className="text-3xl font-bold">{page[0].title}</h1>
      {page[0]?.blocks?.map((block, index: number) => {
        if (isBlockOf(block, "block_hero")) {
          return <Hero key={block.id} {...block.item} />;
        }

        if (isBlockOf(block, "block_cardgroup")) {
          return <CardGroup key={block.id} {...block.item} />;
        }

        if (isBlockOf(block, "block_ticker")) {
          return <Ticker key={block.id} {...block.item} />;
        }

        if (isBlockOf(block, "block_richtext")) {
          return <RichText key={block.id} {...block.item} />;
        }

        if (isBlockOf(block, "block_features")) {
          return <Features key={block.id} {...block.item} />;
        }

        return null;
      })}
    </div>
  );
}
