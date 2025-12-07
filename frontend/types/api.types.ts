export type Partner = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  category: number;
  featured: boolean;
  status: string;
  sort: number;
  slug: string;
};

export type Post = {
  id: string;
  title: string;
  excert: string;
  content: string;
  image: string;
  slug: string;
  category: number;
  date_created: string;
  status: string;
  tags: string[];
  featured: boolean;
  sort: number;
  seo: number;
};
