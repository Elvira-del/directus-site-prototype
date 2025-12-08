import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html className="h-full" lang="en">
      <body className="h-full">
        <div className="grid grid-rows-[auto_1fr_auto] min-h-full">
          <Header />
          <main>
            <Breadcrumbs />
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
