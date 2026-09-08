import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initPerformanceMonitoring } from "./utils/performance";
import { preloadCriticalResources } from "./utils/preload";

// Initialize performance monitoring
initPerformanceMonitoring();

// Preload critical resources
preloadCriticalResources();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
