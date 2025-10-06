import React from "react";
import { cn } from "@/lib/utils";
import { Settings, Wrench, Cpu, Cog } from "lucide-react";

interface ServicesLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const ServicesLoader: React.FC<ServicesLoaderProps> = ({ 
  size = "md", 
  text = "Loading services...",
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
        
        {/* Central Hub */}
        <div className="relative flex items-center justify-center">
          {/* Core circle */}
          <div className={cn(
            "relative rounded-full bg-gradient-to-br from-pink/20 to-lavender/20",
            "backdrop-blur-glass border-2 border-pink/40 shadow-glow",
            "animate-pulse-glow",
            size === "sm" ? "w-16 h-16" : size === "md" ? "w-24 h-24" : "w-32 h-32"
          )}>
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu 
                size={iconSizes[size]} 
                className="text-lavender"
              />
            </div>
          </div>

          {/* Rotating gears */}
          {[
            { Icon: Settings, angle: 0, distance: size === "sm" ? 50 : size === "md" ? 70 : 90, direction: "spin-slow" },
            { Icon: Cog, angle: 90, distance: size === "sm" ? 50 : size === "md" ? 70 : 90, direction: "spin-reverse" },
            { Icon: Wrench, angle: 180, distance: size === "sm" ? 50 : size === "md" ? 70 : 90, direction: "spin-slow" },
            { Icon: Settings, angle: 270, distance: size === "sm" ? 50 : size === "md" ? 70 : 90, direction: "spin-reverse" },
          ].map(({ Icon, angle, distance, direction }, i) => {
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;
            
            return (
              <div
                key={i}
                className={cn("absolute animate-spin-slow")}
                style={{
                  animationDuration: "3s",
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div
                  className={cn(
                    "absolute p-2 rounded-full",
                    "bg-gradient-to-br from-lavender/20 to-pink/20",
                    "backdrop-blur-glass border border-lavender/30",
                    "shadow-glow"
                  )}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Icon 
                    size={iconSizes[size] * 0.6} 
                    className={cn(
                      "text-pink",
                      direction === "spin-reverse" ? "animate-spin-reverse" : "animate-spin-slow"
                    )}
                  />
                </div>
              </div>
            );
          })}

          {/* Connection lines */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div 
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "h-0.5 bg-gradient-to-r from-transparent via-pink/30 to-transparent",
                  "animate-pulse-glow"
                )}
                style={{
                  width: size === "sm" ? "100px" : size === "md" ? "140px" : "180px",
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: "5s" }}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const radius = size === "sm" ? 65 : size === "md" ? 90 : 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-lavender to-pink blur-sm"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            );
          })}
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

export default ServicesLoader;
