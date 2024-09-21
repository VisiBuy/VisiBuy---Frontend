import { useState } from "react";
import Logo from "../ui/Logo";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

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
								{/* <li>
							<a href="#home">Home</a>
						</li> */}
								<li>
									<a href="#features">Product</a>
								</li>
								<li>
									<a href="/about">About Us</a>
								</li>
								<li>
									<a href="#pricing">Pricing</a>
								</li>
							</ul>

							<ul className="main_nav_list_right">
								<li>
									<a href="#login">Login</a>
								</li>
								<li>
									<a href="#signup" className="cta_btn">
										Sign Up
									</a>
								</li>
							</ul>
						</div>
					</nav>
					<button className="menu-toggle" onClick={toggleMenu}>
						{menuOpen ? <FaBarsStaggered /> : <FaXmark />}
					</button>
				</header>
			</div>
		</>
	);
}

export default Header;
