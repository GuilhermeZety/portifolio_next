"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

type Language = "pt" | "en" | "es"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  translations: Record<string, string>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  pt: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    contact: "Contato",
    headline: "Olá, sou Guilherme Martins.",
    headline2: "Desenvolvedor Flutter.",
    subheadline: "Especializado em criar experiências mobile de alta performance com código limpo e design responsivo.",
    aboutTitle: "Sobre Mim",
    aboutDescription: "Desenvolvedor com ",
    aboutDescriptionHighlight: "5 anos de experiência",
    aboutDescriptionRest: ", sendo 4 deles focados no desenvolvimento mobile com Flutter/Dart. Possuindo expertise na aplicação de Clean Architecture, princípios SOLID e uma alta capacidade de resolução de problemas. Com experiência em testes unitários, garantindo a qualidade do código, se destaca principalmente pela entrega de soluções robustas e bem estruturadas.",
    timeline: "Linha do Tempo",
    projectsTitle: "Projetos",
    contactTitle: "Contato",
    viewProject: "Ver Projeto",
    viewCode: "Ver Código",
    changeTheme: "Mudar tema",
    changeLanguage: "Mudar idioma",
    skills: "Habilidades",
    projectsSubtitle: "Confira alguns dos meus projetos recentes em Flutter e desenvolvimento mobile.",
    contactSubtitle: "Entre em contato através de qualquer uma das minhas redes sociais abaixo.",
      /// Timeline items
    ///
    iliaPleno: "Desenvolvedor Flutter Pleno",
    iliaPlenoLocale: "Ília Digital | Brasília - Remoto",
    iliaPlenoDesc: "Atuação na sustentação, manutenção e evolução de software, com foco em aplicativos utilizados por uma grande empresa do setor financeiro, garantindo estabilidade, performance e segurança das soluções.",
    //
    plenoAnalistFlutterDev: "Analista e Desenvolvedor Flutter",
    plenoAnalistFlutterDevLocale: "W2O Softwares e Aplicativos | Blumenau/SC",
    plenoAnalistFlutterDevDesc: "Analise, Arquiteturação e Desenvolvimento de Aplicações no estilo Fábrica de Softwares, Desenvolvendo aplicativos de alta escalabilidade para médias e grandes empresas, utilizando Clean Architecture, SOLID e todas as melhores práticas do Flutter.",
    //
    plenoFlutterDev: "Desenvolvedor Flutter Pleno",
    plenoFlutterDevLocale: "W2O Softwares e Aplicativos | Blumenau/SC",
    plenoFlutterDevDesc: "Desenvolvimento no estilo Fábrica de Softwares, Desenvolvendo aplicativos de alta escalabilidade para médias e grandes empresas, utilizando Clean Architecture, SOLID e todas as melhores práticas do Flutter.",
    //
    webDev: "Desenvolvedor Full-Stack Junior",
    webDevLocale: "RZ Sistemas | Gaspar",
    webDevDesc: "Desenvolvimento de Website B2B e B2C com conexão com ERP interno, desenvolvido em Vue.js e .NET Core. Sempre utilizando das melhores práticas do desenvolvimento de um software.",
    //
    flutterDev: "Desenvolvedor Flutter Júnior",
    flutterDevLocale: "RZ Sistemas | Gaspar/SC",
    flutterDevDesc: "Desenvolvimento de Desenvolvimento aplicativo Offline-First em Flutter para vendas, com conexão em API Rest;",
    //
    graduation: "Curso Profisionalizante Entra21",
    graduationLocale: "Blusoft | Blumenau/SC",
    graduationDesc: "Formação local de Blumenau focada no aprendizado dos principios da programação, OOP e arquitetura de software. Fazendo utilização de tecnologias como Java, C#, Spring Boot e entre outros.",
    //
    graduation2: "Ignite - Flutter",
    graduation2Locale: "Rocketseat | EAD",
    graduation2Desc: "Formação especializada focada no desenvolvimento de aplicações Mobile em Flutter. Com foco em Clean Architecture, SOLID e todas as melhores práticas no universo Flutter.",
    ///
   
    // Skills
    flutterDartTitle: "Flutter & Dart",
    flutterDartDesc: "Development of aplicativos nativos com foco em performance.",
    firebaseTitle: "Firebase & Supabase",
    firebaseDesc: "Integração com serviços de backend para aplicativos escaláveis.",
    uiuxTitle: "UI/UX Design",
    uiuxDesc: "Criação de interfaces intuitivas e experiências de usuário fluidas.",
    // Projects
    ecommerceTitle: "Flutter E-commerce App",
    ecommerceDesc: "Aplicativo de e-commerce completo com Flutter, Firebase e Stripe para pagamentos.",
    taskManagerTitle: "Task Management App",
    taskManagerDesc: "Aplicativo de gerenciamento de tarefas com sincronização em tempo real e notificações.",
    fitnessTitle: "Fitness Tracker",
    fitnessDesc: "Aplicativo de rastreamento de atividades físicas com gráficos e análises personalizadas.",
    weatherTitle: "Weather App",
    weatherDesc: "Aplicativo de previsão do tempo com animações fluidas e dados em tempo real.",
    // Location
    location: "Santa Catarina, Brasil",
    comingSoon: "EM BREVE",
    comingSoonDesc: "Estamos trabalhando em projetos incríveis que serão revelados em breve. Fique ligado para novidades emocionantes!",
  },
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    headline: "Hi, I'm Guilherme Martins.",
    headline2: "Flutter Developer.",
    subheadline: "Specialized in creating high-performance mobile experiences with clean code and responsive design.",
    aboutTitle: "About Me",
    
    aboutDescription: "Developer with ",
    aboutDescriptionHighlight: "5 years of experience",
    aboutDescriptionRest: ", with 4 years focused on mobile development with Flutter/Dart. Expertise in applying Clean Architecture, SOLID principles, and high problem-solving capabilities. Experienced in unit testing, ensuring code quality, standing out mainly for delivering robust and well-structured solutions.",
    timeline: "Timeline",
    projectsTitle: "Projects",
    contactTitle: "Contact",
    viewProject: "View Project",
    viewCode: "View Code",
    changeTheme: "Change theme",
    changeLanguage: "Change language",
    skills: "Skills",
    projectsSubtitle: "Check out some of my recent Flutter and mobile development projects.",
    contactSubtitle: "Get in touch through any of my social networks below.",
    /// Timeline items
    ///
    iliaPleno: "Flutter Developer II",
    iliaPlenoLocale: "Ília Digital | Brazil",
    iliaPlenoDesc: "Acting in the support, maintenance and evolution of software, focusing on applications used by a large company in the financial sector, ensuring stability, performance and security of solutions.",
    ///
    plenoAnalistFlutterDev: "Flutter Analyst and Developer",
    plenoAnalistFlutterDevLocale: "W2O Softwares and Applications | Blumenau/SC",
    plenoAnalistFlutterDevDesc: "Analysis, Architecture, and Development of Applications in Software Factory style, Developing highly scalable applications for medium and large companies, using Clean Architecture, SOLID, and all the best practices of Flutter.",
    //
    plenoFlutterDev: "Flutter Developer II",
    plenoFlutterDevLocale: "W2O Softwares and Applications | Blumenau/SC",
    plenoFlutterDevDesc: "Development in Software Factory style, Developing highly scalable applications for medium and large companies, using Clean Architecture, SOLID, and all the best practices of Flutter.",
    //
    webDev: "Full-Stack Junior Developer",
    webDevLocale: "RZ Systems | Gaspar",
    webDevDesc: "Development of B2B and B2C Website with connection to internal ERP, developed in Vue.js and .NET Core. Always using the best practices of software development.",
    //
    flutterDev: "Junior Flutter Developer",
    flutterDevLocale: "RZ Systems | Gaspar/SC",
    flutterDevDesc: "Development of Offline-First application in Flutter for sales, with connection to Rest API.",
    //
    graduation: "Professional Course Entra21",
    graduationLocale: "Blusoft | Blumenau/SC",
    graduationDesc: "Local training in Blumenau focused on learning programming principles, OOP, and software architecture. Using technologies like Java, C#, Spring Boot, and others.",
    //
    graduation2: "Ignite - Flutter",
    graduation2Locale: "Rocketseat | EAD",
    graduation2Desc: "Specialized training focused on mobile application development in Flutter. With a focus on Clean Architecture, SOLID, and all the best practices in the Flutter universe.",
    ///
    // Skills
    flutterDartTitle: "Flutter & Dart",
    flutterDartDesc: "Development of native applications with focus on performance.",
    firebaseTitle: "Firebase & Supabase",
    firebaseDesc: "Integration with backend services for scalable applications.",
    uiuxTitle: "UI/UX Design",
    uiuxDesc: "Creation of intuitive interfaces and fluid user experiences.",
    // Projects
    ecommerceTitle: "Flutter E-commerce App",
    ecommerceDesc: "Complete e-commerce application with Flutter, Firebase and Stripe for payments.",
    taskManagerTitle: "Task Management App",
    taskManagerDesc: "Task management application with real-time synchronization and notifications.",
    fitnessTitle: "Fitness Tracker",
    fitnessDesc: "Physical activity tracking application with custom charts and analytics.",
    weatherTitle: "Weather App",
    weatherDesc: "Weather forecast application with fluid animations and real-time data.",
    // Location
    location: "Santa Catarina, Brazil",
    comingSoon: "COMING SOON",
    comingSoonDesc: "We are working on amazing projects that will be revealed soon. Stay tuned for exciting news!",
  },
  es: {
    home: "Inicio",
    about: "Sobre",
    projects: "Proyectos",
    contact: "Contacto",
    headline: "Hola, soy Guilherme.",
    headline2: "Desarrollador Flutter.",
    subheadline:
      "Especializado en crear experiencias móviles de alto rendimiento con código limpio y diseño responsivo.",
    aboutTitle: "Sobre Mí",
    aboutDescription: "Desarrollador con ",
    aboutDescriptionHighlight: "5 años de experiencia",
    aboutDescriptionRest: ", con 4 años enfocados en el desarrollo móvil con Flutter/Dart. Experiencia en la aplicación de Clean Architecture, principios SOLID y alta capacidad de resolución de problemas. Con experiencia en pruebas unitarias, garantizando la calidad del código, destacándose principalmente por la entrega de soluciones robustas y bien estructuradas.",
    timeline: "Línea de Tiempo",
    projectsTitle: "Proyectos",
    contactTitle: "Contacto",
    viewProject: "Ver Proyecto",
    viewCode: "Ver Código",
    changeTheme: "Cambiar tema",
    changeLanguage: "Cambiar idioma",
    skills: "Habilidades",
    projectsSubtitle: "Mira algunos de mis proyectos recientes en Flutter y desarrollo móvil.",
    contactSubtitle: "Ponte en contacto a través de cualquiera de mis redes sociales a continuación.",
     /// Timeline items
     ///
    iliaPleno: "Desarrollador Flutter II",
    iliaPlenoLocale: "Ília Digital | Brazil",
    iliaPlenoDesc: "Actuando en el soporte, mantenimiento y evolución de software, con foco en aplicaciones utilizadas por una gran empresa del sector financiero, garantizando la estabilidad, rendimiento y seguridad de las soluciones.",
    ///
    plenoAnalistFlutterDev: "Analista y desarrollador de Flutter",
    plenoAnalistFlutterDevLocale: "W2O Softwares e Aplicativos | Blumenau/SC",
    plenoAnalistFlutterDevDesc: "Análisis, Arquitectura y Desarrollo de Aplicaciones al estilo Software Factory, Desarrollando aplicaciones altamente escalables para medianas y grandes empresas, utilizando Arquitectura Limpia, SOLID y todas las mejores prácticas de Flutter.",
    //
    plenoFlutterDev: "Desarrollador Flutter II",
    plenoFlutterDevLocale: "W2O Softwares e Aplicativos | Blumenau/SC",
    plenoFlutterDevDesc: "Desarrollo estilo Software Factory, desarrollando aplicaciones altamente escalables para medianas y grandes empresas, utilizando Arquitectura Limpia, SOLID y todas las mejores prácticas de Flutter.",
    //
    webDev: "Desarrollador Full-Stack Junior",
    webDevLocale: "RZ Sistemas | Gaspar",
    webDevDesc: "Desarrollo de sitio web B2B y B2C con conexión a ERP interno, desarrollado en Vue.js y .NET Core. Utilizando siempre las mejores prácticas para el desarrollo de software.",
    //
    flutterDev: "Desarrollador Flutter Júnior",
    flutterDevLocale: "RZ Sistemas | Gaspar/SC",
    flutterDevDesc: "Desarrollo de aplicación Offline-First en Flutter para ventas, con conexión en Rest API;",
    //
    graduation: "Curso Profesional Entra21",
    graduationLocale: "Blusoft | Blumenau/SC",
    graduationDesc: "Capacitación local en Blumenau enfocada en el aprendizaje de los principios de programación, POO y arquitectura de software. Utilizando tecnologías como Java, C#, Spring Boot y otras.",
    //
    graduation2: "Ignite - Flutter",
    graduation2Locale: "Rocketseat | EAD",
    graduation2Desc: "Formación especializada enfocada al desarrollo de aplicaciones Móviles en Flutter. Centrado en Arquitectura Limpia, SOLID y todas las mejores prácticas del universo Flutter.",
    /// // Skills
    flutterDartTitle: "Flutter & Dart",
    flutterDartDesc: "Desarrollo de aplicaciones nativas con enfoque en rendimiento.",
    firebaseTitle: "Firebase & Supabase",
    firebaseDesc: "Integración con servicios de backend para aplicaciones escalables.",
    uiuxTitle: "Diseño UI/UX",
    uiuxDesc: "Creación de interfaces intuitivas y experiencias de usuario fluidas.",
    // Projects
    ecommerceTitle: "App de E-commerce Flutter",
    ecommerceDesc: "Aplicación completa de comercio electrónico con Flutter, Firebase y Stripe para pagos.",
    taskManagerTitle: "App de Gestión de Tareas",
    taskManagerDesc: "Aplicación de gestión de tareas con sincronización en tiempo real y notificaciones.",
    fitnessTitle: "Rastreador de Fitness",
    fitnessDesc: "Aplicación de seguimiento de actividad física con gráficos y análisis personalizados.",
    weatherTitle: "App del Clima",
    weatherDesc: "Aplicación de pronóstico del tiempo con animaciones fluidas y datos en tiempo real.",
    // Location
    location: "Santa Catarina, Brasil",
    comingSoon: "PRÓXIMAMENTE",
    comingSoonDesc: "Estamos trabajando en proyectos increíbles que se revelarán pronto. ¡Mantente atento para noticias emocionantes!",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Detectar idioma do navegador na primeira carga
    const browserLang = navigator.language.split("-")[0] as Language
    const validLang = ["pt", "en", "es"].includes(browserLang) ? browserLang : "en"
    setLanguageState(validLang)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    document.documentElement.lang = lang
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
