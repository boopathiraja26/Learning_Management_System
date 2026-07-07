import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <AppRoutes />
    </AuthProvider>
  </StrictMode>
);