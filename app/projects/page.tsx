"use client"

import { useLanguage } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ParticlesBackground } from "@/components/particles-background"
import { FloatingGradient } from "@/components/floating-gradient"

// Atualizar a página Projects para usar as traduções corretamente
export default function ProjectsPage() {
  const { translations } = useLanguage()

  const projects = [
    {
      title: translations.ecommerceTitle,
      description: translations.ecommerceDesc,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Flutter", "Firebase", "Stripe"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: translations.taskManagerTitle,
      description: translations.taskManagerDesc,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Flutter", "Supabase", "Riverpod"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: translations.fitnessTitle,
      description: translations.fitnessDesc,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Flutter", "HealthKit", "Google Fit"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: translations.weatherTitle,
      description: translations.weatherDesc,
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Flutter", "OpenWeather API", "Animations"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ]

  return (
    <main className="min-h-screen pb-16">
      <Navbar />
      <ParticlesBackground />
      <FloatingGradient />

      <div className="container max-w-6xl pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{translations.projectsTitle}</h1>
          <p className="text-xl text-muted-foreground">{translations.projectsSubtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {translations.viewCode}
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {translations.viewProject}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
