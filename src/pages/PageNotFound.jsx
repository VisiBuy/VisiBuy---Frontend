import { Link, useRouteError} from "react-router-dom";

import Header from "../ui/Header";
import Footer from "../ui/Footer";

function PageNotFound() {
	// const navigate= useNavigate();
	const error = useRouteError();
	console.error(error);

	return (
		<>
			<main className="container">
				<Header />
				<section className="page_404_section">
					<div className="page_404_container">
						<h1>404</h1>
						<p>
							Sorry, this page does not exist or is currently under construction.
						</p>

						<Link to="/" >&larr; Go back to homepage</Link>
					</div>
				</section>
			</main>
			{/* <footer className="footer">
				<Footer />
			</footer> */}
			{/* <p>
				<i>{error.statusText || error.message}</i>
			</p> */}
		</>
	);
}

export default PageNotFound;
