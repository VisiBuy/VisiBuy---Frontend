import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

function AppLayout() {
	return (
		<>
			<main className="container">
				<Header />
			</main>
				<div>
				<Outlet />
				</div>
			<footer className="footer">
				<Footer />
			</footer>
		</>
	);
}

export default AppLayout;
