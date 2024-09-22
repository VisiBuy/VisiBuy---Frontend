import Home from "./pages/Home";

import PageNotFound from "./pages/PageNotFound";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import TOS from "./pages/TOS";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import AppLayout from "./ui/AppLayout";

import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";


const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <PageNotFound />,
	
		children: [
			{
				path: "/VisiBuy---Frontend/",
				element: <Home />,
			},
			{
				path: "/VisiBuy---Frontend/faq",
				element: <FAQ />,
				//   errorElement: <PageNotFound />,
			},
			{
				path: "/VisiBuy---Frontend/blog",
				element: <Blog />,
				//   errorElement: <PageNotFound />,
			},
			{
				path: "/VisiBuy---Frontend/pricing",
				element: <Pricing />,
				// errorElement: <PageNotFound />,
			},
			{
				path: "/VisiBuy---Frontend/about",
				element: <AboutUs />,
				// errorElement: <PageNotFound />,
			},
			{
				path: "/VisiBuy---Frontend/tos",
				element: <TOS />,
				// errorElement: <PageNotFound />,
			},
			{
				path: "/VisiBuy---Frontend/privacy-policy",
				element: <PrivacyPolicy />,
				// errorElement: <PageNotFound />,
			},
		]
	},
	{
		basename: "/VisiBuy---Frontend/"
	}
  ]);


function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
