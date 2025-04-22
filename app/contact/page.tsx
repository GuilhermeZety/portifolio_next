"use client"

import { FloatingGradient } from "@/components/floating-gradient"
import { useLanguage } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { ParticlesBackground } from "@/components/particles-background"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const { translations } = useLanguage()

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-6 w-6" />,
      url: "https://github.com/GuilhermeZety",
      username: "@guilhermeZety",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      url: "https://www.linkedin.com/in/guilherme-m-l-martins/",
      username: "Guilherme Martins",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-6 w-6" />,
      url: "https://twitter.com",
      username: "@Gui_Zety",
    },
    {
      name: "Mail",
      icon: <Mail className="h-6 w-6" />,
      url: "mailto:guilherme.zety@outlook.com",
      username: "guilherme.zety@outlook.com",
    },
    {
      name: "Location",
      icon: <MapPin className="h-6 w-6" />,
      url: "#",
      username: translations.location,
    },
  ]

  return (
    <main className="min-h-screen pb-16">
      <Navbar />
      <ParticlesBackground />
      <FloatingGradient />

      <div className="container max-w-4xl pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold">{translations.contactTitle}</h1>
          <p className="text-xl text-muted-foreground">{translations.contactSubtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-6"
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="flex items-center p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="p-2 mr-4 rounded-full bg-primary/10 text-primary">{link.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium">{link.name}</h3>
                <p className="text-muted-foreground">{link.username}</p>
              </div>
              {link.name !== "Location" && (
                <Button asChild variant="ghost">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">Visitar {link.name}</span>
                    <ExternalLinkIcon className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}

function ExternalLinkIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}
