function Customers() {
	return (
		<section className="customers_section">
			<div className="customers_section_container">
				<div className="customers_heading-text-box">
					<h1 className="customers_heading">How It Works</h1>
					<p className="customers_subheading">
						Revolutionize your shopping experience with visibuy in 3 steps
					</p>
				</div>

				<div className="customers_video-box">
					<div className="iframe-div">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/cpOYNSjLybE" title="VisiBuy How it Works" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
					</div>
					<div className="why-visibuy">
						{/* Don't Know how to arrange the benefits of visibuy. Check in the document. I guess youtube is not showing because its localhost */}

						<div className="steps_container">
							<div className="steps">
							<div className="step_number-box">
							<p className="step-number">01</p>
							</div>
							<div className="step_text-box">
								<h2 className="step-heading">Visual verification of products before delivery</h2>
								<p className="step-description">
									Visual verification ensures that you receive exactly what you ordered by allowing you to see photos or videos of your product before it is shipped for delivery.
								</p>
							</div>
							</div>

							<div className="steps">
							<div className="step_text-box">
								{/* <p className="step-number">02</p> */}
								<h2 className="step-heading">Increased trust between sellers and buyers</h2>
								<p className="step-description">
									Increased trust between sellers and buyers is achieved by providing a transparent shopping experience where buyers can visually verify their orders before delivery, ensuring accuracy and reducing disputes.
								</p>
							</div>
							<div className="step_number-box">
							<p className="step-number">02</p>
							</div>
							</div>

							<div className="steps">
							<div className="step_number-box">
							<p className="step-number">03</p>
							</div>
							<div className="step_text-box">
								{/* <p className="step-number">03</p> */}
								<h2 className="step-heading">A better online shopping experience with reduced returns</h2>
								<p className="step-description">
									Enjoy a better online shopping experience with Visibuy! Our platform ensures you receive exactly what you ordered by allowing you to visually verify your purchase before it arrives. Say goodbye to returns and hello to shopping with confidence.
								</p>
							</div>
							</div>

							<div className="steps">
							<div className="step_text-box">
								{/* <p className="step-number">04</p> */}
								<h2 className="step-heading">Seamless integration of delivery riders, sellers and buyers</h2>
								<p className="step-description">
									Experience seamless integration with Visibuy—connecting delivery riders, sellers, and buyers in one platform for smooth transactions and accurate order fulfillment.
								</p>
							</div>
							<div className="step_number-box">
							<p className="step-number">04</p>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Customers;
