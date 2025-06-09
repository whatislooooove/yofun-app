"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Mail, MessageSquare, Phone, User } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({ name: "", email: "", phone: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section className="py-16 bg-indigo-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Остались вопросы?</h2>
              <p className="text-purple-200 mb-8">
                Заполните форму, и мы свяжемся с вами в ближайшее время. Наши специалисты помогут подобрать мероприятие
                или ответят на любые вопросы о предстоящих событиях в городе.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Телефон</p>
                    <p className="text-white font-medium">+7 (999) 123-45-67</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Email</p>
                    <p className="text-white font-medium">info@cityevents.ru</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Режим работы</p>
                    <p className="text-white font-medium">Пн-Пт: 10:00 - 19:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
              {isSuccess ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Спасибо за обращение!</h3>
                  <p className="text-purple-200">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Свяжитесь с нами</h3>

                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше имя"
                      className="pl-12 bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 rounded-xl"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="pl-12 bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 rounded-xl"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Телефон"
                      className="pl-12 bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 rounded-xl"
                      required
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-purple-400" />
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ваше сообщение"
                      className="pl-12 bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 rounded-xl min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-6"
                  >
                    {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
