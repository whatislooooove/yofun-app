import type { Metadata } from "next"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import FAQAccordion from "@/components/ui/faq-accordion"

export const metadata: Metadata = {
    title: "Часто задаваемые вопросы - yofun | FAQ",
    description:
        "Ответы на часто задаваемые вопросы о платформе yofun. Узнайте, как найти события, зарегистрироваться, разместить мероприятие и многое другое.",
    keywords: "FAQ, часто задаваемые вопросы, помощь, поддержка, как пользоваться, регистрация событий, yofun",
    openGraph: {
        title: "Часто задаваемые вопросы - yofun",
        description: "Ответы на популярные вопросы о платформе yofun",
        url: "https://yofun.ru/faq",
        images: [
            {
                url: "/og-faq.jpg",
                width: 1200,
                height: 630,
                alt: "FAQ yofun",
            },
        ],
    },
    alternates: {
        canonical: "https://yofun.ru/faq",
    },
    other: {
        "article:section": "Помощь",
        "page-topic": "Часто задаваемые вопросы",
        "page-type": "FAQ страница",
    },
}

const faqData = [
    {
        question: "Что такое yofun?",
        answer:
            "yofun — это платформа для поиска и открытия интересных и малоизвестных событий в нашем городе. Мы помогаем людям находить уникальные мероприятия, выставки, концерты, квизы и другие культурные события, которые могли бы остаться незамеченными",
    },
    {
        question: "Откуда берутся мероприятия?",
        answer:
            "Все события и мероприятия берутся из открытых источников. У каждого мероприятия указан свой источник (кнопка \"Подробнее\"), откуда он взят",
    },
    {
        question: "Нужна ли регистрация для просмотра событий?",
        answer:
            "Нет, регистрация не требуется для просмотра событий",
    },
    {
        question: "Как разместить свое событие на платформе?",
        answer:
            "Пока самостоятельны вы не можете разместить объявление, для уточнения свяжитесь с нами через форму обратной связи или напишите нам через страницу <a href='/contact' class=\"text-indigo-500 hover:bg-sidebar-accent\">Связаться с нами</a>",
    },
    {
        question: "Какие типы событий представлены на платформе?",
        answer:
            "Мы специализируемся на малоизвестных и уникальных событиях: камерные концерты, арт-выставки, литературные вечера, квизы, мастер-классы, лекции, театральные постановки, фестивали и другие культурные мероприятия",
    },
    {
        question: "Как узнать о новых событиях?",
        answer:
            "Подпишитесь на нашу рассылку в футере сайта или регулярно посещайте сайт =)",
    },
    {
        question: "Что делать, если событие отменили?",
        answer:
            "Перед тем как пойти на событие, обязательно узнайте о детали ней через кнопку \"Подробнее\"",
    },
    {
        question: "Можно ли предложить улучшения для сайта?",
        answer:
            "Конечно! На данном этапе это очень сильно поможет проекту. Все идеи для улучшений и исправлений просим высылать через форму обратной связи на странице <a href='/contact' class=\"text-indigo-500 hover:bg-sidebar-accent\">Связаться с нами</a>  Ваше мнение очень важно для нас",
    },
    {
        question: "Как связаться с организатором события?",
        answer:
            "Пока напрямую такой возможности нет, но можете попробовать связаться с организатором, перейдя на детальную страницу мероприятия",
    },
    {
        question: "Есть ли мобильное приложение?",
        answer:
            "В настоящее время мы работаем над мобильным приложением. Пока вы можете пользоваться мобильной версией сайта, которая оптимизирована для смартфонов и планшетов",
    },
    {
        question: "Как стать партнером yofun?",
        answer:
            "Мы сотрудничаем с культурными центрами, площадками, организаторами событий и медиа. Для обсуждения партнерства напишите нам через страницу <a href='/contact' class=\"text-indigo-500 hover:bg-sidebar-accent\">Связаться с нами</a> с описанием вашего предложения",
    },
]

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
            <Header />

            <main className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Часто задаваемые вопросы</h1>
                        <p className="text-xl text-purple-300 leading-relaxed">
                            Здесь вы найдете ответы на самые популярные вопросы о платформе yofun. Если вашего вопроса нет в
                            списке, не стесняйтесь обращаться к нам.
                        </p>
                    </div>
                </section>

                {/* FAQ Accordion */}
                <section className="max-w-4xl mx-auto">
                    <FAQAccordion items={faqData} />
                </section>

                {/* Contact CTA */}
                <section className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">Не нашли ответ на свой вопрос?</h2>
                        <p className="text-xl mb-6 opacity-90">Мы готовы помочь вам в любое время, напишите свой вопрос лично</p>
                        <a
                            href="/contact"
                            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
                        >
                            Связаться с нами
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
