function Hero() {
	return (
		<>
			<section className="hero_section">
				<div className="hero_text_box">
					<h1 className="hero_heading">
						
						<span className="brand_highlight"></span>
					</h1>
					<p className="hero_description">
						
					</p>

					<a  className="cta_btn" href="#request_demo">Request a Demo</a>
				</div>
                <div className="hero_img_box">
                    <picture>
                    <img src="./" className="hero_img" alt="hero_img" type="image/png" />
                    </picture>
				</div>
			</section>
		</>
	);
}

export default Hero;
