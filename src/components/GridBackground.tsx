import React, { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  children: React.ReactNode
  className?: string
  gridColor?: string
  plusColor?: string
  radius?: number
}

export const GridBackground = ({
  children,
  className,
  // Using muted-foreground ensures it adapts to dark/light automatically
  gridColor = "stroke-muted-foreground/15",
  plusColor = "stroke-muted-foreground/25",
  radius = 400,
}: GridBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const container = containerRef.current
      if (!container) return

      const moveSpotlight = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(spotlightRef.current, {
          "--x": `${x}px`,
          "--y": `${y}px`,
          duration: 0.5,
          ease: "power2.out",
        })
      }

      window.addEventListener("mousemove", moveSpotlight)
      return () => window.removeEventListener("mousemove", moveSpotlight)
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-background",
        "[--ambient-opacity:0.15] dark:[--ambient-opacity:0.25]",
        className
      )}
    >
      <div className="absolute inset-0 opacity-50">
        <GridSVG gridColor={gridColor} plusColor={plusColor} id="base-grid" />
      </div>

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: `radial-gradient(${radius}px circle at var(--x, 50%) var(--y, 50%), black 0%, rgba(0, 0, 0, var(--ambient-opacity)) 100%)`,
          WebkitMaskImage: `radial-gradient(${radius}px circle at var(--x, 50%) var(--y, 50%), black 0%, rgba(0, 0, 0, var(--ambient-opacity)) 100%)`,
        }}
      >
        <GridSVG
          gridColor="stroke-primary/40"
          plusColor="stroke-primary"
          strokeWidth={1}
          id="highlight-grid"
        />
      </div>

      <div className="relative z-10 px-6">{children}</div>
    </div>
  )
}

const GridSVG = ({
  gridColor,
  plusColor,
  id,
  strokeWidth = 0.5,
}: {
  gridColor: string
  plusColor: string
  id: string
  strokeWidth?: number
}) => (
  <svg className="h-full w-full" aria-hidden="true">
    <defs>
      <pattern
        id={id}
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
        x="-1"
        y="-1"
      >
        <path
          d="M 30 0 L 30 25 M 30 35 L 30 60"
          fill="none"
          className={cn(gridColor)}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 0 30 L 25 30 M 35 30 L 60 30"
          fill="none"
          className={cn(gridColor)}
          strokeWidth={strokeWidth}
        />
        <path
          d="M 27 30 L 33 30 M 30 27 L 30 33"
          fill="none"
          className={cn(plusColor)}
          strokeWidth={strokeWidth * 3}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
)
