import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
import "./styles.css";

const qc = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

