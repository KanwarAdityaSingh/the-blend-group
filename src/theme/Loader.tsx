"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Terminal, Code2, Cpu, Zap } from "lucide-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = "md", 
  text = "Loading...",
  fullScreen = false,
  className 
}) => {
  const containerSizes: Record<NonNullable<LoaderProps["size"]>, string> = {
    sm: "w-32",
    md: "w-48",
    lg: "w-64",
  };

  const iconSizes: Record<NonNullable<LoaderProps["size"]>, number> = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const textSizeClasses: Record<NonNullable<LoaderProps["size"]>, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center gap-8",
      className
    )}>
      {/* Tech-inspired loader */}
      <div className={cn(
        containerSizes[size],
        "relative"
      )} role="status" aria-label="Loading">
        
        {/* Laptop/Monitor Frame */}
        <div className="relative">
          {/* Screen */}
          <div className={cn(
            "relative bg-blend-gradient",
            "border-2 border-pink/30 rounded-lg overflow-hidden",
            "backdrop-blur-glass shadow-glow",
            size === "sm" ? "h-20" : size === "md" ? "h-28" : "h-40"
          )}>
            {/* Animated code lines */}
            <div className="p-3 space-y-2">
              {[40, 60, 45, 70, 55].map((width, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full",
                    "bg-gradient-to-r from-pink/40 to-lavender/40",
                    "animate-pulse-glow"
                  )}
                  style={{
                    width: `${width}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            {/* Glowing cursor */}
            <div className="absolute bottom-3 left-3">
              <div className="w-1 h-3 bg-gradient-to-b from-pink to-lavender animate-pulse" />
            </div>

            {/* Floating tech icons */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { Icon: Terminal, delay: "0s", x: "10%", y: "20%" },
                { Icon: Code2, delay: "0.3s", x: "80%", y: "30%" },
                { Icon: Cpu, delay: "0.6s", x: "70%", y: "70%" },
                { Icon: Zap, delay: "0.9s", x: "20%", y: "75%" },
              ].map(({ Icon, delay, x, y }, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse-glow opacity-30"
                  style={{
                    left: x,
                    top: y,
                    animationDelay: delay,
                  }}
                >
                  <Icon 
                    size={Math.round(iconSizes[size] * 0.6)} 
                    className="text-pink"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Laptop base */}
          <div className={cn(
            "relative mt-1 mx-auto rounded-b-lg",
            "bg-gradient-to-b from-foreground/10 to-foreground/5",
            "border-x border-b border-foreground/10",
            size === "sm" ? "h-2 w-36" : size === "md" ? "h-3 w-52" : "h-4 w-72"
          )}>
            {/* Touchpad indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={cn(
                "rounded bg-gradient-to-r from-pink/20 to-lavender/20",
                size === "sm" ? "w-8 h-1" : size === "md" ? "w-12 h-1.5" : "w-16 h-2"
              )} />
            </div>
          </div>
        </div>

        {/* Binary rain effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-xs font-mono text-lavender animate-slide-down"
              style={{
                left: `${i * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "3s",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>

        {/* Pulsing connection lines */}
        <div className="absolute -inset-4 pointer-events-none">
          {[0, 90, 180, 270].map((rotation, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div 
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2",
                  "w-0.5 bg-gradient-to-b from-transparent via-pink/50 to-transparent",
                  "animate-pulse-glow"
                )}
                style={{
                  height: size === "sm" ? "40px" : size === "md" ? "60px" : "80px",
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className="text-center space-y-2">
          <p className={cn(
            textSizeClasses[size],
            "font-medium text-foreground/70 tracking-wide"
          )}>
            {text}
          </p>
          {/* Loading dots */}
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-pink to-lavender animate-pulse-glow"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;


