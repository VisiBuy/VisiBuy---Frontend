import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import router from "./Routes";
import { PersistGate } from "redux-persist/integration/react";

// Using createHashRouter with Hash-based routing is better for GitHub Pages because:
// - GitHub Pages serves static files and does not support server-side routing, meaning traditional routing (createBrowserRouter) would result in 404 errors when refreshing or navigating directly to non-root URLs.
// - Hash-based routing (e.g., https://yourdomain.com/#/about) keeps the routing logic entirely on the client side, bypassing server involvement.
// - It ensures your app works seamlessly across all routes without needing server configuration, making it ideal for static hosting like GitHub Pages.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
