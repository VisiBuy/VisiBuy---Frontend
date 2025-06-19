import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

import { Link } from "react-router-dom"; // Import Link

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="grid footer_grid">
      <div className="footer_logo_col">
        <a href="#" className="footer_logo_section">
          <img
            src="./VisiBuy - White Colored.png"
            alt="footer_logo"
            className="footer_logo"
          />
        </a>
        <ul className="social_links">
          {/* <li>
						<a href="#">
							<FaInstagram />
						</a>
					</li> */}
          <li>
            <a href="https://www.facebook.com/profile.php?id=61563139237527&mibextid=LQQJ4d">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@VisiBuy">
              <FaYoutube />
            </a>
          </li>
          {/* <li>
						<a href="#">
							<FaXTwitter />
						</a>
					</li> */}
        </ul>

        <p className="copyright">
          &copy; <span className="year">2024 - {currentYear}</span> VisiBuy. All
          rights reserved.
        </p>
      </div>

      <div className="footer_nav_links_col">
        <p className="footer_heading">Product</p>
        <ul className="footer_nav">
          <li>
            {/* Added Visibuy FAQ link */}
            <Link
              to="https://visibuy.zohodesk.com/portal/"
              className="footer_link"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/pricings" className="footer_link">
              Pricing
            </Link>
          </li>
        </ul>
      </div>

      <div className="footer_nav_links_col">
        <p className="footer_heading">Resources</p>
        <ul className="footer_nav">
          <li>
            <Link
              to="/blog/visibuy-is-lauching"
              className="text-visibuy-dark-gray hover:text-visibuy-primary transition-colors font-medium"
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>

      <div className="footer_nav_links_col">
        <p className="footer_heading">Company</p>
        <ul className="footer_nav">
          <li>
            <Link to="/aboutus" className="footer_link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>

          <li>
            <Link to="/refund-policy" className="footer_link">
              Refund Ploicy
            </Link>
          </li>
          <li>
            <Link to="/verification-guide" className="footer_link">
              Verification Guide
            </Link>
          </li>
          <li>
            <Link to="/legal-information" className="footer_link">
              Legal Information
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
