"use client"

import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"
import { Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const { language, setLanguage, translations } = useLanguage()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Fechar menu ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/", label: translations.home },
    { href: "/about", label: translations.about },
    { href: "/projects", label: translations.projects },
    { href: "/contact", label: translations.contact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="text-xl font-bold ">
          Guilherme Martins
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-md border-t z-40 animate-in">
                <nav className="flex flex-col p-6 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg py-2 ${
                        pathname === item.href
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex space-x-2 pt-4">
                    <LanguageSelector />
                    <ThemeToggle />
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    pathname === item.href ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function LanguageSelector() {
  const { language, setLanguage, translations } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={translations.changeLanguage}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("pt")}>Português</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")}>Español</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
