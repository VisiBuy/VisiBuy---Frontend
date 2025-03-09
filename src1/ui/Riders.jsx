function Riders() {
    return (
        <section className="riders_section">
            <div className="riders_section_container">
                <div className="riders_heading-text-box">
                    <h1 className="riders_heading">
                        Be one of our Riders
                    </h1>
                    <p className="riders_subheading">
                    Quality Drivers. Great Prices. Tracking. Stress-Free Deliveries.
                    </p>
                </div>

                <div className="riders_image-box">
                    <img src="\rider.png" className="rider_image" alt="rider riding a bike" />
                </div>

                <div>
                <a href="#cta" className="cta_btn">Get Started</a>

                </div>
            </div>
        </section>
    );
};

export default Riders;