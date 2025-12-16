import { notFound } from "next/navigation";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Post from "@/components/Post";

const getPostBySlug = async (params: Promise<{ slug: string }>) => {
  try {
    const { slug } = await params;

    const posts = await client.request(
      readItems("posts", {
        filter: {
          slug: { _eq: slug },
        },
        fields: ["*", "image.title", "image.id"] as const,
        limit: 1,
      }),
    );

    if (!posts || posts.length === 0) {
      return notFound();
    }

    const post = posts[0];
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
};

export default async function PostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPostBySlug(params);

  console.info("POST DETAIL POST:", post);

  return <Post variant={"article"} {...post} />;
}

export async function generateStaticParams() {
  try {
    const posts = await client.request(
      readItems("posts", {
        fields: ["slug"],
      }),
    );

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    const posts = await client.request(
      readItems("posts", {
        filter: {
          slug: { _eq: slug },
        },
        fields: ["title", { seo: ["title", "meta_description"] }],
        limit: 1,
      }),
    );

    if (!posts || posts.length === 0) {
      return {
        title: "Post Not Found",
      };
    }

    const post = posts[0];

    return {
      title: post.seo?.title || "Post",
      description: post.seo?.meta_description || "",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post",
    };
  }
}
