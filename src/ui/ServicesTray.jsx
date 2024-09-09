function ServicesTray() {
    const [currentServicePage, setCurrentNavigation] = useState(servicesPage[0]);

    const servicesPage = ["Customers", "Vendors", "Riders"];

    const renderedPages = {
        Customers: <Customers />,
        Vendor: <Vendor />,
        Riders: <Riders />,
    };

    return (
        <section className="services_container">
            <div className="navigation_container"></div>
            <div className="services_display_tray"></div>
        </section>
    );
};

export default ServicesTray;