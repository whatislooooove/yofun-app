"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)

    // Очищаем ошибки при изменении
    if (emailError) {
      setEmailError("")
    }

    // Сбрасываем статус при изменении
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
      setSubmitMessage("")
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация email
    if (!email.trim()) {
      setEmailError("Email обязателен для заполнения")
      return
    }

    if (!validateEmail(email.trim())) {
      setEmailError("Некорректный формат email")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setEmailError("")

    try {
      const response = await fetch("http://server-nginx:80/api/v1/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      })

      const result = await response.json()
      console.log(result)

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`)
      }

      setSubmitStatus("success")
      setSubmitMessage("Спасибо за подписку! Теперь вы будете получать уведомления о новых мероприятиях.")
      setEmail("") // Очищаем поле после успешной подписки
    } catch (error) {
      console.error("Ошибка подписки:", error)
      setSubmitStatus("error")
      setSubmitMessage(
          error instanceof Error ? error.message : "Произошла ошибка при подписке. Пожалуйста, попробуйте позже.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <footer className="relative bg-indigo-950 pt-20 pb-8">
        {/* Декоративный переход сверху */}
        <div className="absolute top-0 left-0 right-0 h-16">
          <svg
              className="absolute bottom-0 w-full h-16"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,0 C300,80 900,40 1200,0 L1200,120 L0,120 Z" fill="url(#footerGradient)" className="opacity-80" />
            <path d="M0,20 C300,100 900,60 1200,20 L1200,120 L0,120 Z" fill="#1e1b4b" className="opacity-90" />
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#312e81" />
                <stop offset="25%" stopColor="#7c3aed" />
                <stop offset="75%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="text-white text-xl font-bold">CityEvents</span>
              </div>
              <p className="text-purple-300 mb-6">
                Ваш путеводитель по самым интересным событиям города. Концерты, выставки, квизы и многое другое.
              </p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                    <Link
                        key={social.name}
                        href={social.url}
                        className="w-10 h-10 bg-purple-800/30 hover:bg-purple-600/50 rounded-full flex items-center justify-center transition-colors"
                    >
                      {social.name === "facebook" && <Facebook className="w-5 h-5 text-purple-300" />}
                      {social.name === "instagram" && <Instagram className="w-5 h-5 text-purple-300" />}
                      {social.name === "twitter" && <Twitter className="w-5 h-5 text-purple-300" />}
                      {social.name === "youtube" && <Youtube className="w-5 h-5 text-purple-300" />}
                    </Link>
                ))}
              </div>
            </div>

            {FOOTER_LINKS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-white font-bold mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.url} className="text-purple-300 hover:text-white transition-colors">
                            {link.label}
                          </Link>
                        </li>
                    ))}
                  </ul>
                </div>
            ))}

            <div>
              <h3 className="text-white font-bold mb-6">Подписка на новости</h3>
              <p className="text-purple-300 mb-4">Будьте в курсе новых мероприятий и специальных предложений</p>

              {/* Status Messages */}
              {submitStatus === "success" && (
                  <Alert className="mb-4 bg-green-500/20 border-green-500/30">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-300 text-sm">{submitMessage}</AlertDescription>
                  </Alert>
              )}

              {submitStatus === "error" && (
                  <Alert className="mb-4 bg-red-500/20 border-red-500/30">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-300 text-sm">{submitMessage}</AlertDescription>
                  </Alert>
              )}

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div>
                  <Input
                      type="email"
                      placeholder="Ваш email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 rounded-xl"
                      disabled={isSubmitting}
                  />
                  {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Подписка...
                      </>
                  ) : (
                      "Подписаться"
                  )}
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-purple-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-400 text-sm mb-4 md:mb-0">© 2024 CityEvents. Все права защищены.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-purple-400 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-purple-400 hover:text-white text-sm transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
