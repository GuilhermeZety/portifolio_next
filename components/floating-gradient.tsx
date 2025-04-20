"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

export function FloatingGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const gradientRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    // Throttle mouse move events for better performance
    let throttleTimeout: NodeJS.Timeout | null = null
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          handleMouseMove(e)
          throttleTimeout = null
        }, 50) // 50ms throttle
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return

      // Smooth follow mouse
      gradientRef.current.x += (mouseRef.current.x - gradientRef.current.x) * 0.05
      gradientRef.current.y += (mouseRef.current.y - gradientRef.current.y) * 0.05

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const isDark = theme === "dark"
      const gradientSize = Math.min(canvas.width, canvas.height) * 0.8

      const gradient = ctx.createRadialGradient(
        gradientRef.current.x,
        gradientRef.current.y,
        0,
        gradientRef.current.x,
        gradientRef.current.y,
        gradientSize,
      )

      if (isDark) {
        gradient.addColorStop(0, "rgba(124, 58, 237, 0.15)") // Primary color with low opacity
        gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.05)")
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
      } else {
        gradient.addColorStop(0, "rgba(124, 58, 237, 0.1)")
        gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.03)")
        gradient.addColorStop(1, "rgba(124, 58, 237, 0)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", throttledMouseMove)

    // Set initial gradient position to center of screen
    gradientRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", throttledMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
