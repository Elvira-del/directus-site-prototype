"use client";

import { useState, useEffect } from "react";
import { readItems } from "@directus/sdk";
import client from "@/lib/directus";
import Post from "./Post";
import { Container } from "./Container";

export default function PostsSection({ tagline, headline, limit = 3 }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await client.request(
        readItems("posts", {
          limit,
          fields: [
            "id",
            "title",
            "slug",
            "status",
            { author: ["first_name", "last_name"] },
            "published_at",
            "image.title",
            "image.id",
            "description",
            "cross_posted",
          ] as const,
          filter: {
            status: { _eq: "published" },
            cross_posted: { _eq: true },
          },
          sort: ["-published_at"],
        }),
      );
      setPosts(data);
    }

    fetchPosts();
  }, [limit]);

  console.log("POSTS SECTION POSTS:", posts);

  return (
    <section className="mb-10">
      <Container>
        <div className="text-center mb-12">
          <p>{tagline}</p>
          <h2 className="text-gray-900 mb-4">{headline}</h2>
        </div>

        {posts ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
