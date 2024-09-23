import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import TOS from "./pages/TOS";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AppLayout from "./ui/AppLayout";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />, // This will show when no routes match or an error occurs
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/tos",
        element: <TOS />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        // Catch-all route for undefined paths (404)
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
