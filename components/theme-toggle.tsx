"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

// Componente simples sem animação - use este se a animação não funcionar
export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { translations } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={translations.changeTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Componente com animação - este é o que estamos tentando corrigir
export function ThemeToggle() {
  // Por padrão, agora usamos a versão simples
  // Para ativar a animação, mude para "true"
  const ENABLE_ANIMATION = false

  if (!ENABLE_ANIMATION) {
    return <SimpleThemeToggle />
  }

  // A partir daqui é a versão com animação
  return <AnimatedThemeToggle />
}

// Componente separado para a versão animada
function AnimatedThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { translations } = useLanguage()

  const handleThemeChange = (newTheme: string) => {
    // Adicionar classe ao body para a animação
    document.documentElement.classList.add("theme-transition")

    // Aplicar o tema após um pequeno delay
    setTimeout(() => {
      setTheme(newTheme)

      // Remover a classe após a animação terminar
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition")
      }, 1000)
    }, 50)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={translations.changeTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
