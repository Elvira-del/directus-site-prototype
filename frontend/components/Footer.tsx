"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const Footer = ({ navigation }) => {
  // Find the Footer Navigation set by title
  const footerNavigation = navigation?.filter(
    (nav) => nav.title === "Footer Navigation",
  )[0];

  if (!footerNavigation || !footerNavigation.items?.length) {
    return null;
  }
  return (
    // <footer className="bg-gray-900 text-gray-300">
    //   <div className="container mx-auto my-0">
    //     <div className="grid md:grid-cols-3 gap-8 py-10">
    //       <div>
    //         <h3 className="text-white mb-4">Quick Links</h3>
    //         <nav>
    //           <ul className="flex flex-col gap-2.5">
    //             <li>
    //               <Link
    //                 className="hover:text-white transition-colors"
    //                 href="/blog"
    //               >
    //                 Our blog
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className="hover:text-white transition-colors"
    //                 href="/documentation"
    //               >
    //                 Documentation
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className="hover:text-white transition-colors"
    //                 href="/price"
    //               >
    //                 Price
    //               </Link>
    //             </li>
    //             <li>
    //               <Link
    //                 className="hover:text-white transition-colors"
    //                 href="/partners"
    //               >
    //                 Partners
    //               </Link>
    //             </li>
    //           </ul>
    //         </nav>
    //       </div>

    //       <div>
    //         <h3 className="text-white mb-4">Services</h3>
    //         <ul className="flex flex-col gap-2.5">
    //           <li>
    //             <Link className="hover:text-white transition-colors" href="">
    //               Some resource
    //             </Link>
    //           </li>
    //           <li>
    //             <Link className="hover:text-white transition-colors" href="">
    //               Some resource
    //             </Link>
    //           </li>
    //           <li>
    //             <Link className="hover:text-white transition-colors" href="">
    //               Some resource
    //             </Link>
    //           </li>
    //           <li>
    //             <Link className="hover:text-white transition-colors" href="">
    //               Some resource
    //             </Link>
    //           </li>
    //           <li>
    //             <Link className="hover:text-white transition-colors" href="">
    //               Some resource
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>

    //       <div>
    //         <h3 className="text-white mb-4">Contacts</h3>
    //         <ul className="flex flex-col gap-2.5">
    //           <li className="flex items-center gap-2">
    //             <Phone className="h-5 w-5 shrink-0" />
    //             <Link className="hover:text-white transition-colors" href="">
    //               Phone
    //             </Link>
    //           </li>
    //           <li className="flex items-center gap-2">
    //             <Mail className="h-5 w-5 shrink-0" />
    //             <Link className="hover:text-white transition-colors" href="">
    //               Email
    //             </Link>
    //           </li>
    //           <li className="flex items-center gap-2">
    //             <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
    //             <Link className="hover:text-white transition-colors" href="">
    //               Address
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="border-t border-gray-700 mt-8">
    //     <div className="container mx-auto my-0">
    //       <p className="text-center py-10">
    //         © 2025 Your Company. All rights reserved.
    //       </p>
    //     </div>
    //   </div>
    // </footer>
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          {footerNavigation.items.map((item) => (
            <FooterNavigationItem key={item.id} item={item} />
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Your Site. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background-color: #2d3748;
          color: #e2e8f0;
          padding: 60px 0 30px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 40px;
          gap: 20px;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #4a5568;
          font-size: 14px;
          color: #a0aec0;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
};

// Recursively render footer items
function FooterNavigationItem({ item }) {
  if (item.type === "group") {
    return item.children?.map((child) => (
      <Link
        href={resolveItemUrl(child)}
        key={child.id}
        target={child.target === "_blank" ? "_blank" : undefined}
        rel={child.target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {child.label}
      </Link>
    ));
  }

  // If not a group, treat it as a single link section
  return (
    <Link
      href={resolveItemUrl(item)}
      target={item.target === "_blank" ? "_blank" : undefined}
      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {item.title}
    </Link>
  );
}

// Helper to resolve URL for page, post, or url types
function resolveItemUrl(item) {
  if (item.type === "page" && item.page) {
    return `${item.page.permalink}`;
  }
  if (item.type === "post" && item.post) {
    return `/posts/${item.post}`;
  }
  if (item.type === "url" && item.url) {
    return item.url;
  }
  return "#";
}
