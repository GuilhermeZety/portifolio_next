"use client"

import { FloatingGradient } from "@/components/floating-gradient"
import { useLanguage } from "@/components/language-provider"
import { Navbar } from "@/components/navbar"
import { ParticlesBackground } from "@/components/particles-background"
import { motion } from "framer-motion"
import { Briefcase, Flame, GraduationCap, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

// Atualizar a página About para usar as traduções corretamente
export default function AboutPage() {
  const { translations } = useLanguage()

  const timelineItems = [
    {
      year: "2023 - o momento",
      title: translations.plenoAnalistFlutterDev,
      description: translations.plenoAnalistFlutterDevDesc,
      locale: translations.plenoAnalistFlutterDevLocale,
      localeLink: "https://w2o.com.br/",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      year: "2022 - 2023",
      title: translations.plenoFlutterDev,
      description: translations.plenoFlutterDevDesc,
      locale: translations.plenoFlutterDevLocale,
      localeLink: "https://w2o.com.br/",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      year: "2022",
      title: translations.flutterDev,
      locale: translations.flutterDevLocale,
      localeLink: "https://www.rzsistemas.com.br/",
      description: translations.flutterDevDesc,
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      year: "2022",
      title: translations.graduation2,
      locale: translations.graduation2Locale,
      localeLink: "https://www.rocketseat.com.br/",
      description: translations.graduation2Desc,
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      year: "2021 - 2022",
      title: translations.webDev,
      locale: translations.webDevLocale,
      localeLink: "https://www.rzsistemas.com.br/",
      description: translations.webDevDesc,
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      year: "2020 - 2021",
      title: translations.graduation,
      locale: translations.graduationLocale,
      localeLink: "https://www.entra21.com.br/",
      description: translations.graduationDesc,
      icon: <GraduationCap className="h-5 w-5" />,
    },
  ]

  const skills = [
    {
      title: translations.flutterDartTitle,
      description: translations.flutterDartDesc,
      icon: <Flame className="h-5 w-5 text-primary" />,
    },
    {
      title: translations.firebaseTitle,
      description: translations.firebaseDesc,
      icon: <Sparkles className="h-5 w-5 text-primary" />,
    },
    {
      title: translations.uiuxTitle,
      description: translations.uiuxDesc,
      icon: <Zap className="h-5 w-5 text-primary" />,
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
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full md:w-1/4 max-w-[300px] aspect-square mx-auto md:mx-0"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.prismic.io/zety-portifolio/Zv9LcbVsGrYSwWvR_WhatsAppImage2024-10-03at22.56.21.jpeg?auto=format,compress"
                  alt="Profile picture"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  priority
                  quality={100}
                />
              </div>
            </motion.div>
            
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{translations.aboutTitle}</h1>
              <p className="text-l text-muted-foreground">
                {translations.aboutDescription}
                <span className="text-primary font-medium">{translations.aboutDescriptionHighlight}</span>
                {translations.aboutDescriptionRest}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">{translations.skills}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: 0.2 + index * 0.1 }}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-xl font-medium mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-8">{translations.timeline}</h2>

          <div className="relative border-l border-primary/20 pl-8 space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="relative"
                whileHover={{ x: 5 }}
              >
                <div className="absolute -left-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div className="absolute -left-10 w-6 h-6 animate-ping rounded-full bg-primary/30 opacity-75" />
                <time className="text-sm font-semibold text-primary">{item.year}</time>
                <h3 className="text-lg font-medium mt-1">{item.title}</h3>
                {item.locale && (
                  <a 
                    href={item.localeLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs uppercase tracking-wider text-[#bd96ff]/80 block mt-0.5 hover:text-[#bd96ff] transition-colors"
                  >
                    {item.locale}
                  </a>
                )}
                <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
