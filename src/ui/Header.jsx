import Logo from "../ui/Logo";

function Header() {
	return (
		<>
			<header className="header">
				<Logo />
				<nav className="main_nav">
					<ul className="main_nav_list">
						<li>
							<a href="#features">Features</a>
						</li>
						<li>
							<a href="#pricing">Pricing</a>
						</li>
						<li>
							<a href="#about">About</a>
						</li>
						<li>
							<a href="#contact" className="cta_btn">Contact Us</a>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default Header;
