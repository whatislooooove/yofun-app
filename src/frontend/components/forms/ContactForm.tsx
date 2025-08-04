"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, CheckCircle, AlertCircle, Circle } from "lucide-react"
import {sendFeedback} from "@/lib/api";

interface FormData {
    name: string
    email: string
    telegram: string
    subject: string
    message: string
}

interface FormErrors {
    name?: string
    email?: string
    telegram?: string
    subject?: string
    message?: string
}

interface ResponseMessage {
    message: string
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        telegram: "",
        subject: "",
        message: "",
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)
    const [response] = useState<ResponseMessage>({message: ""})

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Валидация имени
        if (!formData.name.trim()) {
            newErrors.name = "Имя обязательно для заполнения"
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Имя должно содержать минимум 2 символа"
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = "Email обязателен для заполнения"
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Введите корректный email адрес"
        }

        // Валидация telegram
        const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/
        if (formData.telegram.trim().length > 0 && !telegramRegex.test(formData.telegram)) {
            newErrors.telegram = "Некорректный никнейм"
        }

        // Валидация темы
        if (!formData.subject.trim()) {
            newErrors.subject = "Тема сообщения обязательна"
        } else if (formData.subject.trim().length < 5) {
            newErrors.subject = "Тема должна содержать минимум 5 символов"
        }

        // Валидация сообщения
        if (!formData.message.trim()) {
            newErrors.message = "Сообщение обязательно для заполнения"
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Сообщение должно содержать минимум 10 символов"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        try {
            // const formDataPrepared = new FormData(e.currentTarget.closest('div').firstElementChild as HTMLFormElement);
            // console.log(formDataPrepared)
            const resp = await sendFeedback(formData)
            const info = await resp.json()

            response.message = info.message ?? ''

            if (resp.status !== 200) {
                setIsError(true)
                return
            }
            setIsSubmitted(true)
            setFormData({ name: "", email: "", telegram: "", subject: "", message: "" })
            setErrors({})
        } catch (error) {
            if (error instanceof Error) {
                console.log("Stack:", error.message);
            }
            console.error("Ошибка отправки формы:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    if (isSubmitted) {
        return (
            <Card className="p-8 bg-green-50 border-green-200">
                <CardContent className="p-0 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Сообщение отправлено!</h3>
                    <p className="text-green-700 mb-6">Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.</p>
                    <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                        Отправить еще одно сообщение
                    </Button>
                </CardContent>
            </Card>
        )
    } else if (isError) {
        return (
            <Card className="p-8 bg-green-50 border-green-200">
                <CardContent className="p-0 text-center">
                    <Circle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Сообщение не отправлено</h3>
                    <p className="text-red-600 mb-6">Произошла внутренняя ошибка</p>
                    {response.message.length > 0 ? (<p className="text-red-600 mb-6">{response.message}</p>) : ''}
                    <Button
                        onClick={() => setIsError(false)}
                        variant="outline"
                        className="border-red-500 hover:bg-red-500 hover:text-white"
                    >
                        Попробовать еще раз
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-0">
                <form className="space-y-6">
                    {/* Имя */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Ваше имя *
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Введите ваше имя"
                            className={`${errors.name ? "border-red-500 focus:border-red-500" : "border-primary"}`}
                            min={2}
                            maxLength={64}
                        />
                        {errors.name && (
                            <div className="flex items-center mt-1 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.name}
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email адрес *
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="your@email.com"
                            className={`${errors.email ? "border-red-500 focus:border-red-500" : "border-primary"}`}
                            maxLength={128}
                        />
                        {errors.email && (
                            <div className="flex items-center mt-1 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* telegram */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Telegram (опционально)
                        </label>
                        <Input
                            id="telegram"
                            type="telegram"
                            value={formData.telegram}
                            onChange={(e) => handleChange("telegram", e.target.value)}
                            placeholder="Ваш telegram"
                            className={`${errors.telegram ? "border-red-500 focus:border-red-500" : "border-primary"}`}
                            min={2}
                            maxLength={64}
                        />
                        {errors.telegram && (
                            <div className="flex items-center mt-1 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.telegram}
                            </div>
                        )}
                    </div>

                    {/* Тема */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Тема сообщения *
                        </label>
                        <Input
                            id="subject"
                            type="text"
                            value={formData.subject}
                            onChange={(e) => handleChange("subject", e.target.value)}
                            placeholder="О чем вы хотите написать?"
                            className={`${errors.subject ? "border-red-500 focus:border-red-500" : "border-primary"}`}
                            maxLength={10000}
                        />
                        {errors.subject && (
                            <div className="flex items-center mt-1 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.subject}
                            </div>
                        )}
                    </div>

                    {/* Сообщение */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Ваше сообщение *
                        </label>
                        <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                            placeholder="Расскажите подробнее о вашем вопросе или предложении..."
                            rows={6}
                            className={`${errors.message ? "border-red-500 focus:border-red-500" : "border-primary"}`}
                        />
                        {errors.message && (
                            <div className="flex items-center mt-1 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.message}
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-gray-500 text-center">* Обязательные поля для заполнения</p>
                </form>
                {/* Кнопка отправки */}
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Отправляем...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            Отправить сообщение
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}
