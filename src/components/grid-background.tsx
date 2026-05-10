import React from "react"
import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  children: React.ReactNode
  className?: string
  gridColor?: string
  plusColor?: string
}

export const GridBackground = ({
  children,
  className,
  gridColor = "stroke-border/50",
  plusColor = "stroke-border",
}: GridBackgroundProps) => {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-background", className)}
    >
      {/* The Grid Layer */}
      <div className="absolute inset-0">
        <svg
          className="h-full w-full"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              x="-1"
              y="-1"
            >
              {/*
                Vertical Line:
                Starts at y=0, stops at y=25.
                Resumes at y=35, ends at y=60.
                This leaves a 10px vertical gap in the center.
              */}
              <path
                d="M 30 0 L 30 25 M 30 35 L 30 60"
                fill="none"
                className={cn(gridColor, "stroke-[0.5]")}
              />
              {/*
                Horizontal Line:
                Starts at x=0, stops at x=25.
                Resumes at x=35, ends at x=60.
                This leaves a 10px horizontal gap in the center.
              */}
              <path
                d="M 0 30 L 25 30 M 35 30 L 60 30"
                fill="none"
                className={cn(gridColor, "stroke-[0.5]")}
              />
              {/*
                The Plus Icon:
                Placed exactly in the center (30,30).
                Horizontal bar from 27 to 33 (length of 6).
                Vertical bar from 27 to 33 (length of 6).
                This leaves a 2px visual gap between the line-ends (at 25/35) and the plus-ends (at 27/33).
              */}
              <path
                d="M 27 30 L 33 30 M 30 27 L 30 33"
                fill="none"
                className={cn(plusColor, "stroke-[1.5]")}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 px-6">{children}</div>
    </div>
  )
}
