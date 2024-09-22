import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import Logo from "../ui/Logo";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

function Header() {
	const [menuOpen, setMenuOpen] = useState(true);

	const toggleMenu = () => {
		setMenuOpen(prev => !prev);
	};

	return (
		<>
			<div className="header-section">
				<header className="header">
					<Logo />
					<nav className="main_nav">
						<div className={`nav_container ${menuOpen ? "open" : ""}`}>
							<ul className="main_nav_list">
								{/* Example of using Link for routing */}
								<li>
									<Link to="/#/features">Product</Link> {/* Update to Link */}
								</li>
								<li>
									<Link to="/#/about">About Us</Link> {/* Update to Link */}
								</li>
								<li>
									<Link to="/#/pricing">Pricing</Link> {/* Update to Link */}
								</li>
							</ul>

							<ul className="main_nav_list_right">
								<li>
									<Link to="/#/login">Login</Link> {/* Update to Link */}
								</li>
								<li>
									<Link to="/#/signup" className="cta_btn"> {/* Update to Link */}
										Sign Up
									</Link>
								</li>
							</ul>
						</div>
					</nav>
					<button className="menu-toggle" onClick={toggleMenu}>
						{menuOpen ? <FaXmark /> : <FaBarsStaggered />}
					</button>
				</header>
			</div>
		</>
	);
}

export default Header;