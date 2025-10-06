"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouteTransition } from "@/theme/RouteTransition";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { begin } = useRouteTransition();
  
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  const navItems = [
    { name: "Services", href: "/services", text: "Loading services..." },
    { name: "Portfolio", href: "/portfolio", text: "Loading portfolio..." },
    { name: "Blogs", href: "/blogs", text: "Loading articles..." },
    { name: "Contact", href: "/contact", text: "Connecting..." },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    begin({ text: item.text, targetRoute: item.href });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-4"
      style={{
        background: `rgba(255, 255, 255, ${backgroundOpacity})`,
        backdropFilter: `blur(${backdropBlur}px)`,
        WebkitBackdropFilter: `blur(${backdropBlur}px)`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          className="text-2xl font-bold brand-title text-gradient"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link 
            href="/main" 
            onClick={() => begin({ text: "Cutting through the noise...", targetRoute: "/main" })}
          >
            BLEND
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Link
                href={item.href}
                onClick={() => handleNavClick(item)}
                className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink to-lavender origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="md:hidden text-foreground/80"
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
}
