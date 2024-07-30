import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import AuthProvider from "./Providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="dark:bg-gray-900">
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <Toaster />
            <RouterProvider router={router} />
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </div>
);
