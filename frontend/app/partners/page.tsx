"use client";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
import { readItems } from "@directus/sdk";
import { Building2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const getPartners = async () => {
  try {
    const partners = await client.request(
      readItems("partners", {
        fields: [
          "id",
          "title",
          "description",
          "slug",
          "logo",
          "website",
          "category",
        ] as const,
      }),
    );

    return partners;
  } catch (error) {
    console.error("Error fetching partners:", error);
  }
};

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    async function fetchPartners() {
      const data = await getPartners();
      setPartners(data);
    }

    fetchPartners();
  }, []);

  const filteredPartners = searchTerm
    ? partners.filter((partner) =>
        partner.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : partners;

  console.info("PARTNERS:", filteredPartners);

  return (
    <section className="mb-10 bg-gray-50">
      <Container>
        <div className="bg-linear-to-b from-blue-50 to-white">
          <div className="mb-8 text-center pt-12">
            <h1 className="text-gray-900 mb-4">Partners</h1>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Browse
              our trusted partners.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-3">
              {/* Search */}
              <div className="md:col-span-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="pl-10"
                    type="search"
                    placeholder="Search partners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {/* {categories?.map(({ name }) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))} */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="col-span-full" />
              <div className="flex items-center justify-between col-span-full">
                <p className="text-gray-600">
                  Showing {filteredPartners.length} of {partners.length}{" "}
                  partners
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort Options</SelectLabel>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="founded-oldest">
                          Oldest First
                        </SelectItem>
                        <SelectItem value="founded-newest">
                          Newest First
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredPartners.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No partners found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {filteredPartners.map((partner) => (
              <li key={partner.id}>
                <Card className="h-full">
                  <CardHeader className="flex justify-between">
                    <CardTitle>{partner.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{partner.category}</Badge>
                    </CardDescription>
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
        )}

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
