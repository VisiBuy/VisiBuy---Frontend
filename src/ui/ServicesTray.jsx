import {
    Children,
    useState
} from "react";

import Customers from "./Customers";
import Riders from "./Riders";
import Vendor from "./Vendor";

function ServicesTray({ navRef }) {
    const servicesPage = ["Customers", "Vendors", "Riders"];
    
	const [currentServicePage, setCurrentServicePage] = useState(servicesPage[0]);


	const renderedPages = {
		Customers: <Customers />,
		Vendors: <Vendor />,
		Riders: <Riders />,
	};

	return (
		<>
			<section ref={navRef} className="services_container">
				<div className="services_navigation_container">
					{Children.toArray(
						servicesPage.map((nav) => {
							return (
								<div key={nav}>
									<input
										type="radio"
										id={nav}
										name="nav"
										onChange={() => setCurrentServicePage(nav)}
									/>
									<label
										htmlFor={nav}
										className={currentServicePage === nav ? "active" : null}>
										{" "}
										{nav}{" "}
									</label>
								</div>
							);
						}),
					)}
				</div>
				<div ref={navRef} className="services_display_tray">
					{renderedPages[currentServicePage]}
				</div>
			</section>
		</>
	);
}

export default ServicesTray;
