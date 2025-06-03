"use client"

import { FloatingGradient } from "@/components/floating-gradient"
import { useLanguage } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { ParticlesBackground } from "@/components/particles-background"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export default function Home() {
  const { translations } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  return (
    <main className="md:min-h-screen h-full">
      <Navbar />
      <ParticlesBackground />
      <FloatingGradient />

      <section className="relative flex flex-col md:min-h-screen  h-[90vh] items-center justify-center px-2 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        </div>

        <motion.div
          className="p-2 max-w-6xl z-10 pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.h1
                className="text-3xl md:text-6xl font-bold tracking-tight mb-4 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {translations.headline}
              </motion.h1>
              <motion.h1
                className="text-2xl md:text-6xl font-bold tracking-tight mb-4 text-[#027DFD] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ fontSize: 'min(7vw, 3.75rem)', width: '100%' }}
              >
                <span className="items-center ">
                  <span>Desenvolvedor</span>{" "}
                  <span className="inline-flex items-center whitespace-nowrap ">
                    Flutter
                    <img src="/icons/flutter.svg" className="w-10 h-10 ml-1 inline-block" alt="Flutter icon" />
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className="text-g md:text-xl text-muted-foreground mb-6 text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {translations.subheadline}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild size="lg">
                  <Link href="/contact">
                    {translations.contact}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">{translations.about}</Link>
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 mt-6 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href="https://github.com/GuilhermeZety" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/guilherme-m-l-martins/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://x.com/Gui_Zety" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="flex justify-center items-center order-first md:order-last mb-4 md:mb-0 pt-8 sm:pt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <Image 
                  src="/spinning_cat.gif" 
                  alt="Spinning Cat" 
                  width={isMobile ? 120 : 220} 
                  height={isMobile ? 120 : 220}
                  className="rounded-full object-cover shadow-lg"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
