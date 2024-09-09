function Hero() {
	return (
		<>
			<section className="hero_section">
				<div className="hero_text_box">
					<div className="brand_section">
						<p className="brand_tagline">
							<span>Beta</span> Shop with Certainty!
						</p>
					</div>
					<h1 className="hero_heading">
						What You See Is What You Get
						<span className="brand_highlight"></span>
					</h1>
					<p className="hero_description">
						Your all-in-one delivery verification platform to shop with ease and
						certainity.
					</p>

					<div className="waitlist_section">
						<input type="email" placeholder="Enter Email Address" />
						<button>Get Started</button>
						{/* <span className="signup_response">
							Thank you for joining the waitlist. You're part of the top list of
							people to know when we launch🥂
						</span> */}
					</div>
						<p className="waitlist_note">
							PS: Join our mailing list and be the first to know when we
							officially launch🎉.
						</p>

					{/* <a className="cta_btn" href="#request_demo">
							Request a Demo
						</a> */}
				</div>
			</section>
		</>
	);
}

export default Hero;
