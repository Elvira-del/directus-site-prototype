import { Container } from "@/components/Container";
import Post from "@/components/Post";
import { Input } from "@/components/ui/input";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Search } from "lucide-react";

const getPosts = async () => {
  try {
    const posts = await client.request(
      readItems("posts", {
        fields: ["*", "image.title", "image.id"] as const,
        filter: {
          status: { _eq: "published" },
        },
        sort: ["-published_at"],
      }),
    );
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export default async function BlogPage() {
  const posts = await getPosts();

  console.log("BLOG PAGE POSTS:", posts);

  return (
    <section className="mb-10">
      <Container>
        <div className="bg-linear-to-b from-blue-50 to-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-gray-900 mb-4">Our Blog</h1>
              <p className="text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Discover insights, updates, and stories from our team.
              </p>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles..."
                  className="pl-12 h-12 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <h1 className="text-3xl font-bold">Blog</h1> */}

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {posts?.length} of {posts?.length} articles
          </p>
        </div>

        {posts ? (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    </section>
  );
}
