import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import client from "@/lib/directus";
import { aggregate, readItems } from "@directus/sdk";
import Link from "next/link";

const getPartners = async () => {
  try {
    const response = await client.request(
      readItems("partners", {
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
      }),
    );

    return response;
  } catch (error) {
    console.error("Error fetching partners:", error);
  }
};

export default async function Page() {
  const partners = await getPartners();

  return (
    <section className="mb-10">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-center">Partners</h1>
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          <div className="flex gap-5 md:col-span-full">
            <Input type="search" placeholder="Search partners..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Separator className="col-span-full" />
          <div className="flex items-center justify-between col-span-full">
            <p className="text-gray-600">Showing num of num partners</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort Options</SelectLabel>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="date-asc">Date Added (Oldest)</SelectItem>
                  <SelectItem value="date-desc">Date Added (Newest)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((partner) => (
            <li key={partner.id}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{partner.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{ __html: partner.description }}
                  />
                </CardContent>
                <CardFooter className="mt-auto">
                  <CardAction>
                    <Button asChild>
                      <Link href={`/partners/${partner.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardAction>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Container>
    </section>
  );
}
