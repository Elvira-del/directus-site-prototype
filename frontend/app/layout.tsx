import { ReactNode } from "react";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navigationData = await client.request(
    readItems("navigation", {
      fields: ["*.*.*.*"] as const,
    }),
  );

  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        <div className="grid grid-rows-[auto_1fr_auto] min-h-full">
          <Header navigation={navigationData} />
          <main>
            <Breadcrumbs />
            {children}
          </main>
          <Footer navigation={navigationData} />
        </div>
      </body>
    </html>
  );
}
