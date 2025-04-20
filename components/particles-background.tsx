"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const [isInitialized, setIsInitialized] = useState(false)

  // Inicializar imediatamente, sem esperar pelo tema
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Definir dimensões iniciais
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Inicializar partículas imediatamente
    initParticles()
    setIsInitialized(true)

    function initParticles() {
      particlesRef.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100)

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    // Iniciar animação imediatamente
    animate()

    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Usar um tema padrão se o tema ainda não estiver resolvido
      const currentTheme = resolvedTheme || "light"
      const particleColor = currentTheme === "dark" ? "255, 255, 255" : "0, 0, 0"

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
        ctx.fill()

        // Connect particles near mouse
        const mouseDistance = Math.hypot(particle.x - mouseRef.current.x, particle.y - mouseRef.current.y)
        if (mouseDistance < 120) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * (1 - mouseDistance / 120)})`
          ctx.stroke()

          // Slightly attract particles to mouse
          const angle = Math.atan2(mouseRef.current.y - particle.y, mouseRef.current.x - particle.x)
          particle.speedX += Math.cos(angle) * 0.02
          particle.speedY += Math.sin(angle) * 0.02

          // Limit speed
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
          if (speed > 1.5) {
            particle.speedX = (particle.speedX / speed) * 1.5
            particle.speedY = (particle.speedY / speed) * 1.5
          }
        } else {
          // Gradually return to original speed
          particle.speedX *= 0.99
          particle.speedY *= 0.99
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reinicializar partículas apenas se o tamanho mudar significativamente
      if (Math.abs(window.innerWidth - canvas.width) > 100 || Math.abs(window.innerHeight - canvas.height) > 100) {
        initParticles()
      }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", throttledMouseMove)

    // Definir posição inicial do mouse no centro
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", throttledMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [resolvedTheme]) // Dependência apenas no resolvedTheme, não no tema

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isInitialized ? 0.6 : 0 }}
    />
  )
}
