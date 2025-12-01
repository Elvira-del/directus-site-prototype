import { notFound } from "next/navigation";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Post from "@/components/Post";

export default async function PostDetail({ params }) {
  try {
    // Get the slug from the params
    const { slug } = await params;

    // Fetch post data with the given slug
    const posts = await client.request(
      readItems("posts", {
        filter: {
          slug: { _eq: slug },
        },
        fields: [
          "id",
          "title",
          "content",
          "slug",
          // "published_date",
          "image.title",
          "image.id",
          // "category",
          // "tags",
          "seo",
        ],
        limit: 1,
      })
    );

    // Handle case where post isn't found
    if (!posts || posts.length === 0) {
      return notFound();
    }

    const post = posts[0];

    return <Post variant={"article"} {...post} />;
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
}

// Generate static params for posts at build time (optional)
export async function generateStaticParams() {
  try {
    const posts = await client.request(
      readItems("posts", {
        fields: ["slug"],
      })
    );

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;

    const posts = await client.request(
      readItems("posts", {
        filter: {
          slug: { _eq: slug },
        },
        fields: ["title", "seo"],
        limit: 1,
      })
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
