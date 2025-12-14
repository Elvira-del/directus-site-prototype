import { Container } from "@/components/Container";
import Post from "@/components/Post";
import client from "@/lib/directus";
import { IPosts } from "@/types/api.types";
import { readItems } from "@directus/sdk";

const getPosts = async () => {
  try {
    const posts = await client.request(
      readItems("posts", {
        fields: [
          "id",
          "title",
          "excert",
          { image: ["id", "title"] },
          "slug",
          "date_created",
          "tags",
        ],
        filter: {
          status: { _eq: "published" },
        },
        sort: ["-date_created"],
      }),
    );
    return posts as IPosts[];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <section className="mb-10">
      <Container>
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
      </Container>
    </section>
  );
}
