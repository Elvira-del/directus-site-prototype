"use client";

import { IPosts } from "@/types/api.types";
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
import { Calendar } from "lucide-react";
import { Container } from "./Container";

type PostProps = IPosts & {
  variant: "card" | "article";
};

export default function Post(post: PostProps) {
  return (
    <>
      {post.variant === "card" ? (
        <Card className="pt-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative h-48">
            <Image
              className="rounded-t-xl"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${post.image.id}`}
              alt={post.image.title}
              fill
            />
          </div>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-3">
              {/* <Badge variant="secondary">{category}</Badge> */}
              {post.tags?.map((tag) => (
                <Badge variant="outline" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle>
              <h3>{post.title}</h3>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date_created).toLocaleDateString()}</span>
            </div>
            <Separator />
            <div dangerouslySetInnerHTML={{ __html: post.excert }} />
          </CardContent>
          <CardFooter className="mt-auto">
            <CardAction>
              <Button asChild>
                <Link href={`/blog/${post.slug}`}>Read more</Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      ) : (
        <section className="mb-10">
          <Container>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date_created).toLocaleDateString()}</span>
            </div>
            <div className="mb-6">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${post.image.id}`}
                alt={post.image.title}
                width={800}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Container>
        </section>
      )}
    </>
  );
}
