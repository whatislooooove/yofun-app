"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Calendar, Brain, Info, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, icon, isActive, onClick }) => (
    <Link
        href={href}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:bg-purple-700/50",
            isActive && "bg-purple-700/70",
        )}
        onClick={onClick}
    >
      {icon}
      {children}
    </Link>
)

interface MobileMenuClientProps {
  navItems: { href: string; label: string }[]
}

export default function MobileMenuClient({ navItems }: MobileMenuClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
      <>
        <Button variant="ghost" size="icon" onClick={handleOpen} className="text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>

        {isOpen && (
            <div
                className="fixed top-0 right-0 bottom-0 z-[9999] w-screen h-screen flex flex-col"
                style={{ height: "100vh", width: "100vw" }} // Ensure full viewport coverage
            >
              {/* Overlay for background click to close */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-lg z-[9998]" onClick={handleClose}></div>

              {/* Modal Content */}
              <div className="relative z-[9999] bg-gradient-to-b from-indigo-950 to-purple-900 shadow-2xl flex flex-col w-full h-full">
                <div className="flex items-center justify-between p-4 border-b border-purple-700/50 shadow-md">
                  <Link href="/" className="flex items-center gap-2 text-white text-xl font-semibold" onClick={handleClose}>
                    <div
                        className="w-16 h-10 ml-4 from-purple-600 to-pink-600 flex items-center justify-center">
                      <img src="/logo.svg" alt="Логотип сайта"/>
                    </div>
                    yofun
                  </Link>
                  <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-purple-700/50">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                {/* Scrollable content area */}
                <nav className="flex-1 overflow-y-auto px-6 pb-6 w-full">
                  <div className="grid gap-2 py-4 text-lg font-medium">
                    {navItems.map((item) => {
                      let IconComponent
                      switch (item.label) {
                        case "Главная":
                          IconComponent = Home
                          break
                        case "Мероприятия":
                          IconComponent = Calendar
                          break
                        case "Викторины":
                          IconComponent = Brain
                          break
                        case "О нас":
                          IconComponent = Info
                          break
                        case "Контакты":
                          IconComponent = Mail
                          break
                        default:
                          IconComponent = Home // Fallback icon
                      }
                      return (
                          <NavLink
                              key={item.href}
                              href={item.href}
                              icon={<IconComponent className="h-5 w-5" />}
                              isActive={pathname === item.href}
                              onClick={handleClose}
                          >
                            {item.label}
                          </NavLink>
                      )
                    })}
                  </div>
                </nav>
                <div className="p-6 border-t border-purple-700/50 text-center text-purple-400 text-sm flex-shrink-0">
                  © {new Date().getFullYear()} yofun. Все права защищены
                </div>
              </div>
            </div>
        )}
      </>
  )
}
