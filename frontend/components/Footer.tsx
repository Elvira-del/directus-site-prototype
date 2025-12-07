import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto my-0">
        <div className="grid md:grid-cols-3 gap-8 py-10">
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <nav>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/blog"
                  >
                    Our blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/documentation"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/price"
                  >
                    Price
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/partners"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-white mb-4">Services</h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link className="hover:text-white transition-colors" href="">
                  Some resource
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="">
                  Some resource
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="">
                  Some resource
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="">
                  Some resource
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="">
                  Some resource
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Contacts</h3>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0" />
                <Link className="hover:text-white transition-colors" href="">
                  Phone
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0" />
                <Link className="hover:text-white transition-colors" href="">
                  Email
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <Link className="hover:text-white transition-colors" href="">
                  Address
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8">
        <div className="container mx-auto my-0">
          <p className="text-center py-10">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
