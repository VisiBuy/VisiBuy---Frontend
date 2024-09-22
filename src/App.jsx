 /* eslint-disable */



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
				path: "/faq",
				element: <FAQ />,
				//   errorElement: <PageNotFound />,
			},
			{
				path: "/blog",
				element: <Blog />,
				//   errorElement: <PageNotFound />,
			},
			{
				path: "/pricing",
				element: <Pricing />,
				// errorElement: <PageNotFound />,
			},
			{
				path: "/about",
				element: <AboutUs />,
				// errorElement: <PageNotFound />,
			},
			{
				path: "/tos",
				element: <TOS />,
				// errorElement: <PageNotFound />,
			},
			{
				path: "/privacy-policy",
				element: <PrivacyPolicy />,
				// errorElement: <PageNotFound />,
			},
		]
	},
  ]);


function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
