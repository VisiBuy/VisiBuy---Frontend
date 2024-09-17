function ServicesManagement() {
	return (
		<section className="service_management_section">
			<div className="service_management_container">
				<div className="service_m-textbox">
					<span className="subheading service_m_subheading">
						Tailor your customer&apos;s experience and yours too
					</span>
					<h2 className="service_m-heading">
						Manage your Deliveries and Riders
					</h2>
				</div>
				<div className="service_m-services">
					<div className="services-section services-rider">
						<header className="services_heading">Your Riders</header>
						<div className="services_subheading">
							Seamlessly use and manage your riders and drivers.
						</div>

						<ul className="services_benefits">
							<li>Get SMS/Email Notifications when assigned a Delivery.</li>
							<li>Dashboard to update delivery progress.</li>
							<li>Invoice generation and receipts of delivery.</li>
						</ul>
					</div>
					<div className="services-section services-customer">
						<header className="services_heading">Your Customers</header>
						<div className="services_subheading">
							Refine your customers experience to the next level.
						</div>

						<ul className="services_benefits">
							<li>Get SMS/Email Notifications when assigned a Delivery.</li>
							<li>Dashboard to update delivery progress.</li>
							<li>Invoice generation and receipts of delivery.</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ServicesManagement;
