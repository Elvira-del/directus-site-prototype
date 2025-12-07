import { Container } from "@/components/Container";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";

export default async function PartnerDetail({ params }) {
  try {
    const { slug } = await params;

    const partners = await client.request(
      readItems("partners", {
        filter: {
          slug: { _eq: slug },
        },
        fields: [
          "id",
          "name",
          "description",
          "logo",
          "website",
          "category",
          "featured",
          "status",
          "sort",
          "slug",
        ],
        limit: 1,
      }),
    );
    const partner = partners[0];

    if (!partner) {
      return notFound();
    }

    return (
      <section className="mb-10">
        <Container>
        <h1 className="text-3xl font-bold">{partner.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: partner.description }} />
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Error fetching partner:", error);
    return notFound();
  }
}
