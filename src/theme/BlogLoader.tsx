import React from "react";
import { cn } from "@/lib/utils";
import { FileText, PenTool, BookOpen, Edit3 } from "lucide-react";

interface BlogLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const BlogLoader: React.FC<BlogLoaderProps> = ({ 
  size = "md", 
  text = "Loading articles...",
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
        
        {/* Animated Document */}
        <div className="relative">
          {/* Document Frame */}
          <div className={cn(
            "relative bg-gradient-to-br from-pink/10 via-lavender/10 to-background",
            "border-2 border-lavender/30 rounded-lg overflow-hidden",
            "backdrop-blur-glass shadow-glow",
            size === "sm" ? "h-24" : size === "md" ? "h-32" : "h-44"
          )}>
            {/* Animated text lines being written */}
            <div className="p-4 space-y-2.5">
              {[85, 70, 90, 65, 80, 75].map((width, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full bg-gradient-to-r from-lavender/50 to-pink/50",
                    "animate-pulse-glow"
                  )}
                  style={{
                    width: `${width}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>

            {/* Writing pen icon */}
            <div className="absolute bottom-4 right-4">
              <PenTool 
                size={iconSizes[size] * 0.7} 
                className="text-pink animate-pulse-glow"
              />
            </div>

            {/* Floating reading icons */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { Icon: FileText, delay: "0s", x: "10%", y: "15%" },
                { Icon: BookOpen, delay: "0.4s", x: "75%", y: "20%" },
                { Icon: Edit3, delay: "0.8s", x: "15%", y: "75%" },
              ].map(({ Icon, delay, x, y }, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse-glow opacity-25"
                  style={{
                    left: x,
                    top: y,
                    animationDelay: delay,
                  }}
                >
                  <Icon 
                    size={iconSizes[size] * 0.5} 
                    className="text-lavender"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Document shadow/base */}
          <div className={cn(
            "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-lg",
            "bg-gradient-to-b from-foreground/5 to-transparent blur-sm",
            size === "sm" ? "h-2 w-28" : size === "md" ? "h-3 w-40" : "h-4 w-56"
          )} />
        </div>

        {/* Rotating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 120, 240].map((rotation, i) => (
            <div
              key={i}
              className="absolute inset-0 animate-spin-slow"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: "4s" }}
            >
              <div 
                className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink to-lavender blur-sm"
                style={{ transform: `translateX(-50%) translateY(${size === "sm" ? "-40px" : size === "md" ? "-60px" : "-80px"})` }}
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

export default BlogLoader;
