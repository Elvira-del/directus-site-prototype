import { Container } from "@/components/Container";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

const getPartnerBySlug = async (slug: string) => {
  try {
    const partners = await client.request(
      readItems("partners", {
        filter: {
          slug: { _eq: slug },
        },
        fields: ["id", "title", "description", "logo", "sort", "slug"] as const,
        limit: 1,
      }),
    );
    const partner = partners[0];
    return partner;
  } catch (error) {
    console.error("Error fetching partner by slug:", error);
    return null;
  }
};

export default async function PartnerDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);

  if (!partner) {
    return notFound();
  }

  return (
    <section className="mb-10">
      <Container>
        <h1 className="text-3xl font-bold">{partner.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: partner.description }} />
      </Container>
    </section>
  );
}
