import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./layout/Root.jsx";
import { RouterProvider } from "react-router-dom";
import render from "./router/Route.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={render}>
        <Root />
      </RouterProvider>
    </QueryClientProvider>
  </AuthProvider>
);
