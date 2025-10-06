import React from "react";
import { cn } from "@/lib/utils";
import { Mail, Send, MessageCircle, AtSign } from "lucide-react";

interface ContactLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const ContactLoader: React.FC<ContactLoaderProps> = ({ 
  size = "md", 
  text = "Connecting...",
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
        
        {/* Envelope Container */}
        <div className="relative">
          {/* Envelope body */}
          <div className={cn(
            "relative bg-gradient-to-br from-pink/10 via-lavender/10 to-background",
            "border-2 border-pink/30 rounded-lg overflow-hidden",
            "backdrop-blur-glass shadow-glow",
            size === "sm" ? "h-20 w-28" : size === "md" ? "h-28 w-40" : "h-36 w-52"
          )}>
            {/* Envelope flap */}
            <div className={cn(
              "absolute top-0 left-0 right-0 border-b-2 border-pink/30",
              "bg-gradient-to-br from-lavender/20 to-pink/20",
              size === "sm" ? "h-10" : size === "md" ? "h-14" : "h-18"
            )}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail 
                  size={iconSizes[size] * 0.8} 
                  className="text-lavender animate-pulse-glow"
                />
              </div>
            </div>

            {/* Message lines */}
            <div className={cn(
              "absolute bottom-2 left-3 right-3 space-y-1.5",
            )}>
              {[60, 75, 50].map((width, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full bg-gradient-to-r from-pink/40 to-lavender/40",
                    "animate-pulse-glow"
                  )}
                  style={{
                    width: `${width}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            {/* Floating send icon */}
            <div className={cn(
              "absolute animate-pulse-glow",
              size === "sm" ? "bottom-2 right-2" : size === "md" ? "bottom-3 right-3" : "bottom-4 right-4"
            )}>
              <Send 
                size={iconSizes[size] * 0.5} 
                className="text-pink"
              />
            </div>
          </div>

          {/* Flying message icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { Icon: MessageCircle, delay: "0s", startX: "50%", startY: "50%", endX: "120%", endY: "-20%" },
              { Icon: AtSign, delay: "0.5s", startX: "50%", startY: "50%", endX: "-20%", endY: "-20%" },
              { Icon: Mail, delay: "1s", startX: "50%", startY: "50%", endX: "120%", endY: "120%" },
            ].map(({ Icon, delay, startX, startY, endX, endY }, i) => (
              <div
                key={i}
                className="absolute animate-pulse-glow opacity-30"
                style={{
                  left: startX,
                  top: startY,
                  animationDelay: delay,
                }}
              >
                <div
                  className="absolute"
                  style={{
                    animation: `float-away-${i} 2s ease-in-out infinite`,
                    animationDelay: delay,
                  }}
                >
                  <Icon 
                    size={iconSizes[size] * 0.5} 
                    className="text-lavender"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Signal waves */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "border-2 border-pink/20 rounded-full animate-pulse-glow pointer-events-none"
              )}
              style={{
                width: size === "sm" ? `${(i + 1) * 50}px` : size === "md" ? `${(i + 1) * 70}px` : `${(i + 1) * 90}px`,
                height: size === "sm" ? `${(i + 1) * 50}px` : size === "md" ? `${(i + 1) * 70}px` : `${(i + 1) * 90}px`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Connection dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 120, 240].map((rotation, i) => (
            <div
              key={i}
              className="absolute inset-0 animate-spin-slow"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: "4s" }}
            >
              <div 
                className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-lavender to-pink blur-sm"
                style={{ transform: `translateX(-50%) translateY(${size === "sm" ? "-45px" : size === "md" ? "-65px" : "-85px"})` }}
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

export default ContactLoader;
