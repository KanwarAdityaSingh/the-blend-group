"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/theme/Loader";
import BlogLoader from "@/theme/BlogLoader";
import ServicesLoader from "@/theme/ServicesLoader";
import PortfolioLoader from "@/theme/PortfolioLoader";
import ContactLoader from "@/theme/ContactLoader";

type RouteTransitionContextValue = {
  begin: (options?: { text?: string }) => void;
};

const RouteTransitionContext = createContext<RouteTransitionContextValue | null>(null);

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const startedFrom = useRef<string | null>(null);
  const [active, setActive] = useState(false);
  const [text, setText] = useState<string>("Cutting through the noise...");

  const begin = useCallback((options?: { text?: string }) => {
    if (options?.text) setText(options.text);
    startedFrom.current = pathname;
    setActive(true);
  }, [pathname]);

  // When the pathname changes from the point we started, fade the overlay out smoothly
  useEffect(() => {
    if (!active) return;
    if (startedFrom.current && pathname !== startedFrom.current) {
      const t = setTimeout(() => setActive(false), 3000);
      return () => clearTimeout(t);
    }
  }, [pathname, active]);

  // Get the appropriate loader based on the target route
  const getLoader = () => {
    if (pathname.includes('/blogs')) {
      return <BlogLoader size="md" text={text} />;
    } else if (pathname.includes('/services')) {
      return <ServicesLoader size="md" text={text} />;
    } else if (pathname.includes('/portfolio')) {
      return <PortfolioLoader size="md" text={text} />;
    } else if (pathname.includes('/contact')) {
      return <ContactLoader size="md" text={text} />;
    } else {
      return <Loader size="md" text={text} />;
    }
  };

  return (
    <RouteTransitionContext.Provider value={{ begin }}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {getLoader()}
          </motion.div>
        )}
      </AnimatePresence>
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx) throw new Error("useRouteTransition must be used within RouteTransitionProvider");
  return ctx;
}


