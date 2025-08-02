import type { Metadata } from "next"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import { Users, Target, Heart, Award, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "О нас - yofun | Команда энтузиастов городских событий",
    description:
        "Узнайте больше о команде yofun. Мы помогаем людям находить уникальные и малоизвестные события в городе. Наша миссия - сделать культурную жизнь доступнее и интереснее.",
    keywords: "о нас, команда yofun, миссия, ценности, история компании, культурные события, городские мероприятия",
    openGraph: {
        title: "О нас - yofun | Команда энтузиастов городских событий",
        description: "Узнайте больше о команде yofun и нашей миссии по популяризации культурных событий",
        url: "https://yofun.ru/about",
        images: [
            {
                url: "/og-about.jpg",
                width: 1200,
                height: 630,
                alt: "О команде yofun",
            },
        ],
    },
    alternates: {
        canonical: "https://yofun.ru/about",
    },
    other: {
        "article:section": "О компании",
        "page-topic": "Информация о компании",
        "page-type": "Корпоративная страница",
    },
}

export default async function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
            <Header />

            <main className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">О нас</h1>
                        <p className="text-xl text-purple-100 leading-relaxed">
                            Мы — команда энтузиастов, которая верит в силу культурных событий объединять людей и делать жизнь ярче.
                            Наша миссия — помочь вам открыть удивительные и малоизвестные события в нашем городе.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                            <CardContent className="p-0">
                                <div className="flex items-center mb-4">
                                    <Target className="w-8 h-8 text-purple-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Наша миссия</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Сделать культурную жизнь города доступной каждому. Мы стремимся к тому, чтобы никто не пропустил
                                    интересное событие из-за недостатка информации. Каждый заслуживает возможности участвовать в
                                    культурной жизни своего города.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                            <CardContent className="p-0">
                                <div className="flex items-center mb-4">
                                    <Heart className="w-8 h-8 text-pink-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Наши ценности</h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    Мы ценим разнообразие, качество и доступность. Верим в силу сообщества и важность поддержки местных
                                    инициатив. Стремимся создать платформу, где каждый найдет что-то особенное для себя.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Our Story */}
                <section className="mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">Наша история</h2>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                            <p className="text-gray-600 leading-relaxed mb-6">
                                yofun родился из простой идеи: в наждом городе происходит множество интересных событий, но люди
                                часто не знают о них. В конце 2024 года наша команда решила изменить это, создав платформу, которая
                                показывает те мероприятия, которые не показываются на крупных площадках. Наша команда
                                неоднократно посещала и посещает (и будет посещать) все эти мероприятия.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Мы начали с небольшой команды энтузиастов, которые вручную собирали информацию о малоизвестных событиях.
                                Сегодня мы выросли в полноценную платформу, которая помогает тысячам людей находить интересные
                                мероприятия каждый день.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Наша цель — стать главным источником информации о культурных событиях в нашей Йошкар-Оле и помочь создать более
                                активное и вовлеченное сообщество.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">Готовы присоединиться?</h2>
                        <p className="text-xl mb-6 opacity-90">
                            Станьте частью нашего сообщества и не пропускайте интересные события
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Связаться с нами
                            </a>
                            <a
                                href="/"
                                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                            >
                                Посмотреть события
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
