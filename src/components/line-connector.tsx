import React, { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export const LineConnector = ({ sourceRef, targetRefs }) => {
  const svgRef = useRef(null)
  const [paths, setPaths] = useState([])
  const [targetCircles, setTargetCircles] = useState([])

  useLayoutEffect(() => {
    const calculateLayout = () => {
      if (!sourceRef.current || !targetRefs.current.length || !svgRef.current)
        return

      const svgRect = svgRef.current.getBoundingClientRect()
      const sourceRect = sourceRef.current.getBoundingClientRect()

      // Base shared origin: Bottom-Left of the H1
      const baseOriginX = sourceRect.left - svgRect.left + 16
      const baseOriginY = sourceRect.bottom - svgRect.top

      const TRACE_GAP = 12 // Gap between each trace
      const INITIAL_DROP = 10 // Initial vertical drop before fanning
      const TARGET_OFFSET_X = 15 // Space before text for markers

      const newPaths = []
      const newCircles = []

      targetRefs.current.forEach((target, index) => {
        if (!target) return
        const targetRect = target.getBoundingClientRect()

        // Target coordinates
        const endX = targetRect.left - svgRect.left - TARGET_OFFSET_X
        const endY = targetRect.top + targetRect.height / 2 - svgRect.top

        // --- PCB Trace Logic (No Overlap) ---
        // 1. Line goes down slightly from origin
        // 2. Line cuts horizontally to its *unique* channel (index * TRACE_GAP)
        // 3. Line goes down its channel
        // 4. Line cuts horizontally to target

        // Each line gets its own unique X-coordinate trace
        const uniqueTraceX = baseOriginX + index * TRACE_GAP

        const pathData = `
          M ${baseOriginX} ${baseOriginY}
          v ${INITIAL_DROP}
          H ${uniqueTraceX}
          V ${endY}
          H ${endX}
        `

        newPaths.push(pathData)
        newCircles.push({ cx: endX, cy: endY })
      })

      setPaths(newPaths)
      setTargetCircles(newCircles)
    }

    // Calculate immediately and on resize
    const timeout = setTimeout(calculateLayout, 50)
    const observer = new ResizeObserver(calculateLayout)
    observer.observe(document.body)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [sourceRef, targetRefs])

  useLayoutEffect(() => {
    // Watch Dogs "Tracing" Animation using DashOffset
    if (paths.length > 0) {
      // 1. Draw the lines
      gsap.fromTo(
        ".wd-trace-path",
        { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.inOut",
        }
      )
      // 2. Pop the destination circles
      gsap.fromTo(
        ".wd-target-marker",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 1.0, // Start popping as lines finish
          ease: "back.out(2)",
          transformOrigin: "center center",
        }
      )
    }
  }, [paths])

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ overflow: "visible", zIndex: 0 }}
    >
      <defs>
        {/* Basic filter for data glow */}
        <filter id="wd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. The Right-Angled PCB Traces */}
      {paths.map((d, i) => (
        <path
          key={`trace-${i}`}
          className="wd-trace-path fill-none stroke-current text-cyan-400 opacity-60"
          style={{ filter: "url(#wd-glow)" }}
          d={d}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      ))}

      {/* 2. Destination Markers (Technical Dashed Circle) */}
      {targetCircles.map((circle, i) => (
        <circle
          key={`marker-${i}`}
          className="wd-target-marker fill-none stroke-current text-cyan-400"
          style={{ filter: "url(#wd-glow)" }}
          cx={circle.cx}
          cy={circle.cy}
          r="4"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      ))}
    </svg>
  )
}
