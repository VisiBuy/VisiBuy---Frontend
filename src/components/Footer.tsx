import { Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-visibuy-dark-gray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Social */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">VISIBUY</h2>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-visibuy-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-visibuy-green transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <p className="text-visibuy-light-shade text-sm">
              © 2024 - 2025 VisiBuy. All rights reserved.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/verification-guide" className="text-visibuy-light-shade hover:text-white transition-colors">
                  Verification Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-visibuy-light-shade hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-visibuy-light-shade hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-visibuy-light-shade hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://developers.visibuy.com.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-visibuy-light-shade hover:text-white transition-colors"
                >
                  Visual Verification API
                </a>
              </li>

            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-visibuy-light-shade hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-visibuy-light-shade hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-visibuy-light-shade hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-visibuy-light-shade hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;