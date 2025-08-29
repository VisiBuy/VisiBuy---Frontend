import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { NavItem } from "./NavItem";

export const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Guide",
    href: "/verification-guide",
  },
  {
    name: "FAQ",
    href: "/faq",
  },
  {
    name: "Blog",
    href: "/blog/visibuy-is-lauching",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [disclaimerVisible, setDisclaimerVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide disclaimer
        setDisclaimerVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show disclaimer
        setDisclaimerVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-sm border-b border-visibuy-light-shade transition-all duration-300 ease-in-out ${
        disclaimerVisible ? "top-10" : "top-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-visibuy-primary">
            <img
              className="logo_icon"
              alt="visibuy_logo"
              src="./VisiBuy - Black.png"
              width={120}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ name, href }) => (
              <NavItem key={name} href={href} name={name} />
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-visibuy-green text-visibuy-green hover:bg-visibuy-green hover:text-white py-2 text-lg h-12 bg-transparent"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-visibuy-green hover:bg-visibuy-green/90 text-white hover:text-white text-lg h-12">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-visibuy-dark-gray" />
            ) : (
              <Menu className="w-6 h-6 text-visibuy-dark-gray" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-visibuy-light-shade">
            <nav className="py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/pricing"
                className="block px-4 py-2 text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/verification-guide"
                className="block px-4 py-2 text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Verification Guide
              </Link>
              <Link
                to="/faq"
                className="block px-4 py-2 text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                to="/blog/visibuy-is-lauching"
                className="block px-4 py-2 text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="px-4 py-2 space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-visibuy-green text-visibuy-green hover:bg-visibuy-green hover:text-white h-12 bg-transparent"
                >
                  Login
                </Button>
                <Button className="w-full bg-visibuy-green hover:bg-visibuy-green/90 text-white hover:text-white text-lg h-12">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
