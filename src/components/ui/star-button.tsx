"use client";

import React, { useRef, useEffect, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface StarBackgroundProps {
  color?: string;
}

function StarBackground({ color }: StarBackgroundProps) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color || "currentColor"} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color || "currentColor"} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#starGlow)" rx="inherit" />
    </svg>
  );
}

interface StarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  className?: string;
}

export function StarButton({
  children,
  lightWidth = 110,
  duration = 3,
  lightColor = "#FAFAFA",
  backgroundColor = "currentColor",
  borderWidth = 2,
  className,
  ...props
}: StarButtonProps) {
  const pathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const div = pathRef.current;
      div.style.setProperty(
        "--path",
        `path('M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0')`,
      );
    }
  }, []);

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md",
        className,
      )}
      {...props}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <StarBackground color={lightColor} />
      </div>

      {/* Animated border */}
      <div
        ref={pathRef}
        className="absolute inset-0"
        style={
          {
            "--duration": duration,
            "--light-width": lightWidth,
            "--light-color": lightColor,
            "--bg-color": backgroundColor,
            "--border-width": `${borderWidth}px`,
          } as CSSProperties
        }
      >
        {/* Border background */}
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: `var(--bg-color, ${backgroundColor})`,
            opacity: 0.15,
          }}
        />
        {/* Animated light */}
        <div
          className="absolute animate-star-btn"
          style={{
            width: `calc(var(--light-width, ${lightWidth}) * 1px)`,
            height: "100%",
            offsetPath: `var(--path)`,
            background: `linear-gradient(90deg, transparent, var(--light-color, ${lightColor}), transparent)`,
            mixBlendMode: "plus-lighter",
          }}
        />
        {/* Inner cutout */}
        <div
          className="absolute rounded-[inherit] bg-background"
          style={{
            inset: `var(--border-width, ${borderWidth}px)`,
          }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10 px-6 py-2.5 text-sm font-medium">
        {children}
      </span>
    </button>
  );
}
