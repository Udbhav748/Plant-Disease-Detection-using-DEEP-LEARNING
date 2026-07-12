import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-content flex-1 px-6">{children}</main>
      <Footer />
    </div>
  );
}
