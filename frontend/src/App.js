import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/ui/Toast";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import PageLayout from "./layouts/PageLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const PredictPage = lazy(() => import("./pages/PredictPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <PageLayout>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/predict" element={<PredictPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </PageLayout>
          <ToastContainer />
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
