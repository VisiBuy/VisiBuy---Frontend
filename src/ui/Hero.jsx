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

					<form action='https://forms.zohopublic.com/visibuy1/form/Earlyadopters/formperma/QxdTWBh4lPuQJThpBAZ5WesybXha8ur4m47OH3-lPzE/htmlRecords/submit' name='form' method="POST" className="waitlist_section" id="cta"  acceptCharset='UTF-8' enctype='multipart/form-data' onSubmit={(e) => {e.preventDefault()}}>
						<div >
						<input type="email" name="Email" placeholder="Enter Email Address" value={email} onChange={emailHandler} autoComplete= "on" required />
						<input type="hidden" name="zf_referrer_name" value="" />
						<input type="hidden" name="zf_redirect_url" value="" />
						<input type="hidden" name="zc_gad" value="" />
						<button className="cta_btn" type="submit" onClick={submitHandler} >{buttonText}</button>
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
