import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
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
					<li>
						<a href="#">
							<FaInstagram />
						</a>
					</li>
					<li>
						<a href="https://www.facebook.com/profile.php?id=61563139237527&mibextid=LQQJ4d">
							<FaFacebook />
						</a>
					</li>
					<li>
						<a href="#">
							<FaXTwitter />
						</a>
					</li>
				</ul>

				<p className="copyright">
					&copy; <span className="year">2024</span> VisiBuy. All rights
					reserved.
				</p>
			</div>

			<div className="footer_nav_links_col">
				<p className="footer_heading">Product</p>
				<ul className="footer_nav">
					<li>
						{/* Added Visibuy FAQ link */}
						<a href="https://visibuy.freshdesk.com" className="footer_link">
							FAQ
						</a>
					</li>
					<li>
						<a href="/pricing" className="footer_link">
							Pricing
						</a>
					</li>
				</ul>
			</div>

			<div className="footer_nav_links_col">
				<p className="footer_heading">Resources</p>
				<ul className="footer_nav">
					<li>
						<a href="/blog" className="footer_link">
							Blog
						</a>
					</li>
				</ul>
			</div>

			<div className="footer_nav_links_col">
				<p className="footer_heading">Company</p>
				<ul className="footer_nav">
					<li>
						<a href="/about" className="footer_link">
							About Us
						</a>
					</li>
					<li>
						<a href="/tos" className="footer_link">
							Terms of Service
						</a>
					</li>
					<li>
						<a href="/privacy-policy" className="footer_link">
							Privacy Policy
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Footer;
