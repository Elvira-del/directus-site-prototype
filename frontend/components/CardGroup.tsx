import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Container } from "./Container";

export default function CardGroup({
  id,
  headline,
  content,
  group_type,
  posts,
  cards,
}) {
  console.info("CardGroup props:", {
    posts,
    cards,
  });

  if (!posts.length && !cards?.length) {
    return null;
  }

  return (
    <section className="mb-10">
      <Container>
        <div className="text-center mb-5">
          <h2 className="text-gray-900 text-2xl mb-4">{headline}</h2>
          <div
            className="text-gray-600 max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {group_type === "posts" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post, index) => (
              <Card
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 pt-0"
                key={index}
              >
                <div className="relative h-48">
                  <Image
                    className="rounded-t-xl"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${post.posts_id?.image}`}
                    alt=""
                    fill
                  />
                </div>

                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {/* TODO: category and tags */}
                    <CardTitle>
                      <h3>{post.posts_id?.title}</h3>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                      __html: post.posts_id?.excert,
                    }}
                  />

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(
                        post.posts_id?.date_created,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <CardAction>
                    <Button asChild>
                      <Link href={`/blog/${post.posts_id?.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardAction>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        {group_type === "custom" && (
          <div>
            {cards?.map((card, index) => (
              <div key={index}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${card.cards_id?.image}`}
                  alt=""
                  width={70}
                  height={35}
                />
                <p
                  dangerouslySetInnerHTML={{ __html: card.cards_id?.content }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-5">
          <Button asChild>
            <Link href="/blog">
              View All Posts <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
