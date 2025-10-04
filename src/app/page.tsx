"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "@/theme/Loader";
import { useRouteTransition } from "@/theme/RouteTransition";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { begin } = useRouteTransition();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const goMain = () => {
    begin({ text: "Cutting through the noise..." });
    router.push("/main");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[-120px] left-[-80px] h-[420px] w-[420px] rounded-full"
          style={{ background: "radial-gradient(closest-side, var(--pink-500), transparent 70%)" }}
          animate={{ y: [0, -12, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-120px] right-[-80px] h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(closest-side, var(--lavender-500), transparent 70%)" }}
          animate={{ y: [0, 12, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 sm:px-10">
        {/* Global transition overlay handles loader; keep page clean */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-gradient"
        >
          The Blend Group
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-center text-base sm:text-lg md:text-xl text-[color:var(--fg)]/80"
        >
          Where AI and Aesthetics Converge.
        </motion.p>

        {/* Glass prompt bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
          className="glass mt-10 w-full max-w-2xl rounded-2xl p-2 shadow-lg"
          style={{ animation: "subtle-pulse 6s ease-in-out infinite" }}
        >
          <div className="flex items-center gap-2 rounded-xl bg-white/20 p-3">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goMain();
              }}
              placeholder="make me a website…"
              className="w-full bg-transparent px-2 py-2 text-base sm:text-lg outline-none placeholder-[color:var(--fg)]/50 text-[color:var(--fg)]"
            />
            <button
              onClick={goMain}
              className="rounded-xl px-4 py-2 text-sm font-medium text-white"
              style={{ background: "linear-gradient(90deg, var(--pink-500), var(--lavender-500))" }}
            >
              Enter
            </button>
          </div>
        </motion.div>

        {/* Subtle helpers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="mt-10 text-center text-xs sm:text-sm text-[color:var(--fg)]/60"
        >
          Tip: Press Enter to begin. The experience will gently transition.
        </motion.div>
      </main>
    </div>
  );
}
