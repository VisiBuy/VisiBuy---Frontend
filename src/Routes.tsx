import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import TOS from "./pages/TOS";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AppLayout from "./ui/AppLayout";
import { LoginPage } from "./pages/Login";
import { SignUpPage } from "./pages/SignUpPage";
import { PassowordRestPage } from "./pages/PasswordResetPage";
import { SellerDashboardLayout } from "./layouts/seller-dashboard-layout";
import { SellerProductPage } from "./pages/Seller/Product";
import { FeedbackPage } from "./pages/Seller/Feedback";
import { SellerOrderPage } from "./pages/Seller/Order";
import { SellerOrderDetailsPage } from "./pages/Seller/OrderDetails";
import { PrivateRoute } from "./common/components/private-route";
import { HelpSupportPage } from "./pages/Seller/help-support/help-support";
import path from "path";
import { PlacingOrderPage } from "./pages/Seller/help-support/placing-order";
import { OrderPaymentPage } from "./pages/Seller/help-support/order-payment";
import BuyerDashboardLayout from "./layouts/buyer/BuyerDashboardLayout";
import BuyerDashboardPage from "./pages/Buyer/Dashboard";
import BuyerProductsPage from "./pages/Buyer/Products";
import BuyerTrackOrderPage from "./pages/Buyer/TrackOrder";
import BuyerOrderDetailsPage from "./pages/Buyer/OrderDetails";
import BuyerCartPage from "./pages/Buyer/Cart";
import BuyerCartSummaryPage from "./pages/Buyer/CartSummary";
import BuyerNotificationsPage from "./pages/Buyer/Notifications";
import BuyerProfilePage from "./pages/Buyer/Profile";
import BuyerProductDetails from "./pages/Buyer/ProductDetails";
import Checkout from "./modules/Buyer/features/checkout/Checkout";
import BuyerNotificationsDetailsPage from "./pages/Buyer/NotificationsDetails";
import FileDispute from "./pages/Buyer/FileDispute";

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
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/reset-password", element: <PassowordRestPage /> },
  {
    path: "/dashboard/seller",

    element: (
      <PrivateRoute>
        <SellerDashboardLayout />
      </PrivateRoute>
      // <SellerDashboardLayout />
    ),
    children: [
      { path: "products", element: <SellerProductPage /> },
      { path: "order-details", element: <div>test</div> },
      { path: "feedback", element: <FeedbackPage /> },
      {
        path: "orders",
        element: <SellerOrderPage />,
        children: [
          { path: "view/:orderId", element: <SellerOrderDetailsPage /> },
        ],
      },
      {
        path: "call-support",
        element: <HelpSupportPage />,
        children: [
          { path: "placing-order", element: <PlacingOrderPage /> },
          { path: "order-payment", element: <OrderPaymentPage /> },
        ],
      },
    ],
  },
  // Buyer Dashboard Routes
  {
    path: "/dashboard/buyer",
    element: (
      <PrivateRoute>
        <BuyerDashboardLayout />
      </PrivateRoute>
      // <BuyerDashboardLayout />
    ),
    children: [
      
      { index:true, element: <BuyerProductsPage /> },
      { path: "analytics", element: <BuyerDashboardPage /> },


      {
        path: "track-order",
        element: <BuyerTrackOrderPage />,
        children: [
          { path: "view/:orderId", element: <BuyerOrderDetailsPage /> },
        ],
      },

      { path: "product/:id", element: <BuyerProductDetails /> },
      

      { path: "carts", element: <BuyerCartPage /> },
      { path: "carts/summary/:id", element: <BuyerCartSummaryPage /> },
      { path: "carts/checkout/:id", element: <Checkout /> },

      { path: "notification", element: <BuyerNotificationsPage /> },
      { path: "notification/:id", element: <BuyerNotificationsDetailsPage /> },
      { path: "report", element: <FileDispute /> },
      { path: "profile", element: <BuyerProfilePage /> },
    ],
  },
]);

export default router;
