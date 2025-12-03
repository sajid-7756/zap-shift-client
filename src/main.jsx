import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Router.jsx";
import RootLayout from "./Layouts/RootLayout.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// expose for extension — must be instance, not class
if (typeof window !== "undefined") {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}>
          <RootLayout></RootLayout>
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
