import React from "react";
import { cn } from "@/lib/utils";
import { Image, Layout, Layers, Palette } from "lucide-react";

interface PortfolioLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const PortfolioLoader: React.FC<PortfolioLoaderProps> = ({ 
  size = "md", 
  text = "Loading portfolio...",
  fullScreen = false,
  className 
}) => {
  const containerSizes = {
    sm: "w-32",
    md: "w-48",
    lg: "w-64",
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const content = (
    <div className={cn(
      "flex flex-col items-center justify-center gap-8",
      className
    )}>
      <div className={cn(
        containerSizes[size],
        "relative"
      )} role="status" aria-label="Loading">
        
        {/* Gallery Grid */}
        <div className="relative">
          <div className={cn(
            "grid grid-cols-2 gap-2",
            size === "sm" ? "w-28" : size === "md" ? "w-40" : "w-52"
          )}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "relative bg-gradient-to-br from-pink/10 via-lavender/10 to-background",
                  "border-2 border-lavender/30 rounded-lg overflow-hidden",
                  "backdrop-blur-glass shadow-glow",
                  "animate-pulse-glow",
                  size === "sm" ? "h-12" : size === "md" ? "h-18" : "h-24"
                )}
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {/* Image placeholder with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink/20 to-lavender/20" />
                
                {/* Loading shimmer effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
                  style={{
                    animation: "shimmer 2s infinite",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />

                {/* Icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  {i === 0 && <Image size={iconSizes[size] * 0.5} className="text-pink" />}
                  {i === 1 && <Layout size={iconSizes[size] * 0.5} className="text-lavender" />}
                  {i === 2 && <Layers size={iconSizes[size] * 0.5} className="text-lavender" />}
                  {i === 3 && <Palette size={iconSizes[size] * 0.5} className="text-pink" />}
                </div>
              </div>
            ))}
          </div>

          {/* Central focus indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className={cn(
              "rounded-full border-2 border-pink/40 animate-pulse-glow",
              size === "sm" ? "w-16 h-16" : size === "md" ? "w-24 h-24" : "w-32 h-32"
            )} />
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "rounded-full border-2 border-lavender/40 animate-pulse-glow",
              size === "sm" ? "w-20 h-20" : size === "md" ? "w-28 h-28" : "w-36 h-36"
            )}
            style={{ animationDelay: "0.3s" }}
            />
          </div>

          {/* Floating creative icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { Icon: Palette, angle: 45, distance: size === "sm" ? 50 : size === "md" ? 70 : 90 },
              { Icon: Image, angle: 135, distance: size === "sm" ? 50 : size === "md" ? 70 : 90 },
              { Icon: Layers, angle: 225, distance: size === "sm" ? 50 : size === "md" ? 70 : 90 },
              { Icon: Layout, angle: 315, distance: size === "sm" ? 50 : size === "md" ? 70 : 90 },
            ].map(({ Icon, angle, distance }, i) => {
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;
              
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 animate-pulse-glow opacity-30"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  <Icon 
                    size={iconSizes[size] * 0.6} 
                    className={i % 2 === 0 ? "text-pink" : "text-lavender"}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Orbiting frame */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none" style={{ animationDuration: "6s" }}>
          <div className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full",
            "bg-gradient-to-r from-pink to-lavender blur-sm"
          )}
          style={{ transform: `translateX(-50%) translateY(${size === "sm" ? "-50px" : size === "md" ? "-70px" : "-90px"})` }}
          />
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
          <div className="flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-lavender to-pink animate-pulse-glow"
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

export default PortfolioLoader;
