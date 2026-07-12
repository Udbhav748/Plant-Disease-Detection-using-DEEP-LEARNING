import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";
import AboutModal from "./AboutModal";

export default function Navbar() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border dark:border-border-dark bg-background/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
            <Leaf className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          LeafSense
        </Link>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => setIsAboutOpen(true)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary dark:text-text-secondary-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-colors duration-150"
          >
            About
          </button>
          <ThemeToggle />
          {location.pathname !== "/predict" && (
            <Button to="/predict" size="sm" className="ml-1">
              Try it now
            </Button>
          )}
        </nav>
      </div>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </header>
  );
}
