"use client"

import { useEffect, useState } from "react"

export function useMobile() {
  // Inicializa com undefined para indicar que ainda não sabemos
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Função para verificar se é dispositivo móvel
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inicialmente
    checkIfMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Limpar listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Retorna false como fallback para renderização no servidor
  // e o valor real quando disponível no cliente
  return isMobile ?? false
}
