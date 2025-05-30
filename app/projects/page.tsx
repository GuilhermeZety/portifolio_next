"use client"

import { FloatingGradient } from "@/components/floating-gradient"
import { useLanguage } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { ParticlesBackground } from "@/components/particles-background"
import { motion } from "framer-motion"

export default function ProjectsPage() {
  const { translations } = useLanguage()

  return (
    <main className="min-h-screen pb-16">
      <Navbar />
      <ParticlesBackground />
      <FloatingGradient />

      <div className="container max-w-4xl h-[100vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations.comingSoon}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            {translations.comingSoonDesc}
          </p>
        </motion.div>
      </div>
    </main>
  )
}
