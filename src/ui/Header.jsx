import Logo from "../ui/Logo";

function Header() {
	return (
		<>
			<header className="header">
				<nav className="main_nav">
					<Logo />
					
					<ul className="main_nav_list">
						{/* <li>
							<a href="#home">Home</a>
						</li> */}
						<li>
							<a href="#features">Product</a>
						</li>
						<li>
							<a href="#about">About Us</a>
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
							<a href="#signup" className="cta_btn">Sign Up</a>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default Header;
