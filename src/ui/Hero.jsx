import HandleWaitList from "../services/HandleWaitList";

function Hero() {
// HandleWaitList();
	const { email, emailHandler, submitHandler, buttonText, message, isSuccessful } = HandleWaitList();

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
						Your all-in-one verification plus delivery platform to shop with ease and
						certainty.
					</p>

					<form className="waitlist_section" id="cta" onSubmit={(e) => {e.preventDefault()}}>
						<div >
						<input type="email" placeholder="Enter Email Address" value={email} onChange={emailHandler} autoComplete= "on" required />
						<button className="cta_btn" onClick={submitHandler} >{buttonText}</button>
							</div>
					{ isSuccessful && <span className="signup_response">
					<p>{message}</p>
						</span>}
					</form>
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
