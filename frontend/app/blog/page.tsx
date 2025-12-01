"use client";

import Post from "@/components/Post";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.request(
          readItems("posts", {
            fields: [
              "id",
              "title",
              "slug",
              "image.title",
              "image.id",
              "excert",
              "content",
              // "category",
              "status",
              // "tags",
              "featured",
              "sort",
              "date_created",
            ],
            filter: {
              status: { _eq: "published" },
            },
            sort: ["-date_created"],
          })
        );
        setPosts(response);
        console.log("Posts fetched:", response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  console.info("Rendering posts:", posts);

  return (
    <section className="mb-10">
      <div className="container mx-auto my-0">
        <h1 className="text-3xl font-bold">Blog</h1>
        {posts ? (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Post key={post.id} variant={"card"} {...post} />
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  );
}
