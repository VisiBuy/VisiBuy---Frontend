function ServicesManagement() {
	return (
		<section className="service_management_section">
			<div className="service_management_container">
				<div className="service_m-textbox">
					<span className="subheading service_m_subheading">
						Optimize Your Business with Visibuy
					</span>
					<h2 className="service_m-heading">
						Effortless Delivery and Order Management
					</h2>
				</div>
				<div className="service_m-services">
					<div className="services-section services-rider">
						<header className="services_heading">Your Riders</header>
						<div className="services_subheading">
							Manage Your Deliveries and Riders Seamlessly
						</div>

						<ul className="services_benefits" dir="auto">
							<li>Automatic Assignment: Riders are assigned automatically.</li>
							<li>Real-Time Tracking: Track deliveries easily.</li>
							<li>Instant Notifications: Receive updates via SMS/Email.</li>
						</ul>
						<div className="services_image">
							<img src="src\sass\pages\assets\cart vector object.png" />
						</div>
					</div>
					<div className="services-section services-customer">
						<header className="services_heading">Your Customers</header>
						<div className="services_subheading">
							Refine your customers experience to the next level.
						</div>

						<ul className="services_benefits">
							<li>Improved Experience: Visual order confirmation.</li>
							<li>Real-Time Updates: Instant SMS/Email alerts.</li>
							<li>Order Tracking: Live delivery status.</li>
						</ul>
						<div className="services_image">
							<img src="src\sass\pages\assets\cart vector object.png" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ServicesManagement;
