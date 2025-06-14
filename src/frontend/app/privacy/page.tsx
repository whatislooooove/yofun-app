import type { Metadata } from "next"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
    title: "Политика конфиденциальности - yofun",
    description:
        "Политика конфиденциальности yofun. Узнайте, как мы собираем, используем и защищаем ваши персональные данные в соответствии с законодательством РФ.",
    keywords: "политика конфиденциальности, защита данных, персональные данные, приватность, GDPR, 152-ФЗ",
    openGraph: {
        title: "Политика конфиденциальности - yofun",
        description: "Политика конфиденциальности и защиты персональных данных",
        url: "https://yofun.ru/privacy",
    },
    alternates: {
        canonical: "https://yofun.ru/privacy",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
            <Header />

            <main className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Политика конфиденциальности</h1>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg space-y-8">
                        <div className="text-sm text-gray-500 mb-6">Дата последнего обновления: 15 июня 2025 года</div>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Общие положения</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки персональных
                                данных пользователей сайта yofun.ru (далее — «Сайт») и мобильных приложений (далее — «Сервис»).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Какие данные мы собираем</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Мы можем собирать следующие категории персональных данных:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Имя</li>
                                <li>Адрес электронной почты</li>
                                <li>Номер телефона (при указании)</li>
                                <li>Имя пользователя в Telegram (при указании)</li>
                                <li>Информация об устройстве и браузере</li>
                                <li>IP-адрес и данные о посещениях сайта</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Цели обработки данных</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Мы обрабатываем персональные данные для следующих целей:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Предоставление услуг Сервиса</li>
                                <li>Регистрация и авторизация пользователей</li>
                                <li>Отправка уведомлений о событиях и новостях</li>
                                <li>Персонализация контента и рекомендаций</li>
                                <li>Обработка обращений в службу поддержки</li>
                                <li>Проведение аналитики и улучшение Сервиса</li>
                                <li>Соблюдение требований законодательства</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Сроки хранения данных</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не более 5
                                лет с момента последнего взаимодействия с пользователем. После истечения срока хранения данные подлежат
                                уничтожению или обезличиванию.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Безопасность данных</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Мы применяем технические и организационные меры для защиты персональных данных от несанкционированного
                                доступа, изменения, раскрытия или уничтожения. Все данные передаются по защищенным каналам связи и
                                хранятся на серверах с соответствующими мерами безопасности.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Файлы cookie</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Наш Сайт использует файлы cookie для улучшения пользовательского опыта, аналитики и персонализации
                                контента. Вы можете управлять настройками cookie в своем браузере. Отключение cookie может ограничить
                                функциональность Сайта.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Изменения в Политике</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Мы оставляем за собой право вносить изменения в настоящую Политику. О существенных изменениях мы
                                уведомим пользователей через Сайт или по электронной почте. Рекомендуем регулярно проверять актуальную
                                версию Политики.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Контактная информация</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                По вопросам обработки персональных данных вы можете обращаться к нам:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 mb-2">
                                    <strong>Email:</strong> info@yofun.ru
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
