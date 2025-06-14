import type { Metadata } from "next"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
    title: "Условия использования - yofun",
    description:
        "Условия использования платформы yofun. Правила пользования сервисом, права и обязанности пользователей, ограничения ответственности.",
    keywords: "условия использования, пользовательское соглашение, правила сервиса, права пользователей, ответственность",
    openGraph: {
        title: "Условия использования - yofun",
        description: "Условия использования платформы yofun",
        url: "https://yofun.ru/terms",
    },
    alternates: {
        canonical: "https://yofun.ru/terms",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
            <Header />

            <main className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Условия использования</h1>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg space-y-8">
                        <div className="text-sm text-gray-500 mb-6">Дата последнего обновления: 15 июня 2025 года</div>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Общие положения</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Настоящие Условия использования (далее — «Условия») регулируют отношения между пользователями и
                                администрацией сайта yofun (далее — «Сервис», «Платформа»).
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Используя Сервис, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо положениями,
                                пожалуйста, не используйте Платформу.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Описание сервиса</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                yofun — это онлайн-платформа для поиска и продвижения культурных событий и мероприятий. Сервис
                                предоставляет следующие возможности:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Поиск и просмотр информации о событиях</li>
                                <li>Получение рекомендаций и уведомлений</li>
                                <li>Взаимодействие с сообществом пользователей</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Работа сервиса</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Сервис собирает данные из открытых источников. Все используемые источники прикреплены к карточкам мероприятий
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Регистрация и аккаунт</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Для использования некоторых функций Сервиса может потребоваться регистрация. При регистрации вы
                                обязуетесь:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Предоставлять достоверную и актуальную информацию</li>
                                <li>Поддерживать безопасность своего аккаунта</li>
                                <li>Не передавать доступ к аккаунту третьим лицам</li>
                                <li>Немедленно уведомлять о компрометации аккаунта</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                Вы несете полную ответственность за все действия, совершенные под вашим аккаунтом.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Правила использования</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">При использовании Сервиса запрещается:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Размещать недостоверную, вводящую в заблуждение информацию</li>
                                <li>Нарушать права интеллектуальной собственности</li>
                                <li>Размещать контент, нарушающий законодательство РФ</li>
                                <li>Использовать автоматизированные средства для сбора данных</li>
                                <li>Создавать чрезмерную нагрузку на серверы Сервиса</li>
                                <li>Пытаться получить несанкционированный доступ к системам</li>
                                <li>Размещать спам, рекламу без согласования</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Ответственность</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">Администрация Сервиса:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Не несет ответственности за содержание размещаемых пользователями материалов</li>
                                <li>Не гарантирует бесперебойную работу Сервиса</li>
                                <li>Не несет ответственности за действия организаторов событий</li>
                                <li>Не является посредником при заключении сделок между пользователями</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                Пользователи самостоятельно несут ответственность за свои действия и размещаемый контент.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Прекращение использования</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">Администрация имеет право:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Приостановить или заблокировать аккаунт при нарушении Условий</li>
                                <li>Удалить контент, нарушающий правила Сервиса</li>
                                <li>Прекратить предоставление услуг без предварительного уведомления</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                Пользователи могут в любое время прекратить использование Сервиса и удалить свой аккаунт.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Изменения условий</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Администрация оставляет за собой право изменять настоящие Условия. О существенных изменениях
                                пользователи будут уведомлены через Сервис или по электронной почте. Продолжение использования Сервиса
                                после внесения изменений означает согласие с новыми Условиями.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Применимое право</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Настоящие Условия регулируются законодательством Российской Федерации. Все споры подлежат рассмотрению в
                                судах по месту нахождения администрации Сервиса.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Контактная информация</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                По вопросам, связанным с настоящими Условиями, обращайтесь:
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
