import React, { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import TOS from "./pages/TOS";
import Login from "./app/Auth/Login";
import Register from "./app/Auth/Register";
import ForgotPassword from "./app/Auth/ForgotPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AppLayout from "./ui/AppLayout";
import "./index.css";

const router = createHashRouter([
  // Routes without AppLayout
  {
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgetpassword", element: <ForgotPassword /> },
    ],
  },

  // Routes with AppLayout
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/blog", element: <Blog /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/tos", element: <TOS /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "*", element: <PageNotFound /> }, // Catch-all route for undefined paths (404)
    ],
  },
]);

function App() {
  useEffect(() => {
    // Dynamically add Material Icons stylesheet to the document head
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined";
    document.head.appendChild(link);

    // Cleanup when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
