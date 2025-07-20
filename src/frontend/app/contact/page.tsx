import type { Metadata } from "next"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import ContactForm from "@/components/forms/ContactForm"
import { Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Связаться с нами - yofun | Контакты и обратная связь",
    description:
        "Свяжитесь с командой yofun. Мы готовы ответить на ваши вопросы, выслушать предложения и помочь с размещением событий на нашей платформе.",
    keywords: "контакты, связаться с нами, обратная связь, поддержка, CityEvents, размещение событий, партнерство",
    openGraph: {
        title: "Связаться с нами - yofun",
        description: "Свяжитесь с командой yofun для вопросов и предложений",
        url: "https://yofun.ru/contact",
        images: [
            {
                url: "/og-contact.jpg",
                width: 1200,
                height: 630,
                alt: "Контакты yofun",
            },
        ],
    },
    alternates: {
        canonical: "https://yofun.ru/contact",
    },
    other: {
        "article:section": "Контакты",
        "page-topic": "Обратная связь",
        "page-type": "Контактная страница",
    },
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
            <Header />

            <main className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Связаться с нами</h1>
                        <p className="text-xl text-purple-300 leading-relaxed">
                            У вас есть вопросы, предложения или вы хотите разместить свое событие? Мы всегда рады помочь и выслушать
                            ваши идеи.
                        </p>
                    </div>
                </section>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Напишите нам</h2>
                        <ContactForm />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Контактная информация</h2>

                        <div className="space-y-6">
                            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                                <CardContent className="p-0">
                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-full mr-4">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                            <p className="text-gray-600">
                                                info@yofun.ru
                                                <br />
                                                <span className="text-sm">Отвечаем в течение 24 часов</span>
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-2">Часто задаваемые вопросы</h3>
                            <p className="text-gray-600 mb-4">Возможно, ответ на ваш вопрос уже есть в нашем разделе FAQ</p>
                            <a href="/faq" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                                Посмотреть FAQ
                            </a>
                        </div>
                    </div>
                </div>

                <section className="mt-16">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Хотите стать партнером?</h2>
                        <p className="text-xl mb-6 opacity-90">
                            Мы всегда открыты для сотрудничества с организаторами событий, площадками и культурными учреждениями
                        </p>
                        <a
                            href="mailto:partnership@yofun.ru"
                            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
                        >
                            Написать о партнерстве
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
