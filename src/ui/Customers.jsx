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
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/yyQOVRFtLnU?si=uXNu-7TPNb9VIddH"
							title="VisiBuy How it Works"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowfullscreen></iframe>
					</div>
					<div className="why-visibuy">
						{/* Don't Know how to arrange the benefits of visibuy. Check in the document. I guess youtube is not showing because its localhost */}

						<div className="steps_container">
							<div className="steps">
								<div className="step_number-box">
									<p className="step-number">01</p>
								</div>
								<div className="step_text-box">
									<h2 className="step-heading">
										Visual verification of products before delivery
									</h2>
									<p className="step-description">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
										Numquam, delectus beatae dignissimos id qui neque. Facere
										quasi harum in repellat, impedit vel nostrum ducimus, quas
										sunt nulla adipisci ab illum.
									</p>
								</div>
							</div>

							<div className="steps">
								<div className="step_text-box">
									{/* <p className="step-number">02</p> */}
									<h2 className="step-heading">
										Increased trust between sellers and buyers
									</h2>
									<p className="step-description">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
										Numquam, delectus beatae dignissimos id qui neque. Facere
										quasi harum in repellat, impedit vel nostrum ducimus, quas
										sunt nulla adipisci ab illum.
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
									<h2 className="step-heading">
										A better online shopping experience with reduced returns
									</h2>
									<p className="step-description">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
										Numquam, delectus beatae dignissimos id qui neque. Facere
										quasi harum in repellat, impedit vel nostrum ducimus, quas
										sunt nulla adipisci ab illum.
									</p>
								</div>
							</div>

							<div className="steps">
								<div className="step_text-box">
									{/* <p className="step-number">04</p> */}
									<h2 className="step-heading">
										Seamless integration of delivery riders, sellers and buyers
									</h2>
									<p className="step-description">
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
										Numquam, delectus beatae dignissimos id qui neque. Facere
										quasi harum in repellat, impedit vel nostrum ducimus, quas
										sunt nulla adipisci ab illum.
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
