import CTA from "../ui/CTA";
import CtaForm from "../ui/CtaForm";
import Header from "../ui/Header";
import Hero from "../ui/Hero";
import ServicesManagement from "../ui/ServicesManagement";
import ServicesTray from "../ui/ServicesTray";
import Testimonials from "../ui/Testimonials";

function Home() {
	return (
		<>
			<Header />
			<Hero />
			<ServicesTray />
			<CtaForm />
			<ServicesManagement />
			{/* <Testimonials /> */}
			<CTA />
		</>
	);
}

export default Home;
