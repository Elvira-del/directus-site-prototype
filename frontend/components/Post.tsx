"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Calendar, Sparkles } from "lucide-react";
import { Container } from "./Container";

export default function Post({
  variant = "card",
  id,
  title,
  author,
  slug,
  description,
  image,
  content,
  published_at,
}) {
  return (
    <>
      {variant === "article" ? (
        <section className="mb-10">
          <Container>
            <article className="prose lg:prose-xl max-w-4xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl border-4 border-white">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10" />
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${image.id}`}
                  alt={image.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                  width={500}
                  height={400}
                />

                <div className="absolute top-6 left-6 z-20">
                  <Badge className="bg-linear-to-r from-yellow-400 to-amber-400 text-white border-0 shadow-lg px-4 py-1.5 gap-2">
                    <Sparkles className="h-4 w-4" />
                    Featured
                  </Badge>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden border-2 border-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-yellow-300/50 to-pink-300/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-blue-300/50 to-purple-300/50 rounded-full blur-3xl" />

                <div className="relative z-10">
                  {/* Category and Tags */}
                  {/* <div className="flex flex-wrap gap-2 mb-6">
                <Badge className={`${colors.badge} px-4 py-1.5 border shadow-sm`}>
                  {post.category}
                </Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="px-3 py-1 gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
                  </div> */}

                  <h1 className="text-gray-900 mb-6 relative">
                    {title}
                    <div
                      className={`absolute -bottom-2 left-0 h-1 w-24 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full`}
                    />
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      <span>
                        {new Date(published_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span>{post.readTime}</span>
                </div> */}
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8 p-6 bg-linear-to-r from-gray-50 to-gray-100/50 rounded-2xl border-l-4 shadow-sm">
                    {description}
                  </p>
                </div>
              </div>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="text-gray-600 leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </CardContent>
              </Card>
            </article>
          </Container>
        </section>
      ) : (
        <Card className="pt-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative h-48">
            <Image
              className="rounded-t-xl object-cover"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${image.id}`}
              alt={image.title}
              fill
            />
          </div>
          <CardHeader>
            {/* <div className="flex flex-wrap gap-2 mb-3"> */}
            {/* <Badge variant="secondary">{category}</Badge>
            {post.tags?.map((tag) => (
              <Badge variant="outline" key={tag}>
                {tag}
              </Badge>
            ))} */}
            {/* </div> */}
            <CardTitle>
              <h3>{title}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              <span>Published on {new Date(published_at).toDateString()}</span>
            </div>
            <Separator />
            <p>{description}</p>
          </CardContent>
          <CardFooter className="mt-auto">
            <CardAction>
              <Button asChild>
                <Link href={`/blog/${slug}`}>Read more</Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
