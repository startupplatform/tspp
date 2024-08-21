import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./adapters/api.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          duration={20 * 1000}
          position="top-center"
          richColors
          closeButton
          offset={"32px"}
        />
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
