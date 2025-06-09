"use client"

import { Calendar, Sparkles, Coffee, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmptyState() {
    return (

            <div className="max-w-4xl mx-auto text-center">
                {/* Главная иллюстрация */}
                <div className="relative mb-12">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center relative overflow-hidden">
                        {/* Фоновые декоративные элементы */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-indigo-200/30"></div>
                        <div className="absolute top-4 left-4 w-8 h-8 bg-purple-300/40 rounded-full animate-pulse"></div>
                        <div
                            className="absolute bottom-6 right-6 w-6 h-6 bg-indigo-300/40 rounded-full animate-pulse"
                            style={{ animationDelay: "1s" }}
                        ></div>
                        <div
                            className="absolute top-1/2 left-2 w-4 h-4 bg-pink-300/40 rounded-full animate-pulse"
                            style={{ animationDelay: "2s" }}
                        ></div>

                        {/* Центральная иконка */}
                        <Calendar className="w-24 h-24 text-purple-400 relative z-10" />

                        {/* Плавающие иконки */}
                        <div className="absolute top-8 right-8 animate-bounce" style={{ animationDelay: "0.5s" }}>
                            <Sparkles className="w-6 h-6 text-purple-500" />
                        </div>
                        <div className="absolute bottom-8 left-8 animate-bounce" style={{ animationDelay: "1.5s" }}>
                            <Coffee className="w-6 h-6 text-indigo-500" />
                        </div>
                    </div>
                </div>

                {/* Заголовок */}
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                    Тишина перед бурей
                </h1>

                {/* Подзаголовок */}
                <h2 className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
                    В ближайшее время событий не планируется, но это временно!
                </h2>

                {/* Описание */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-purple-100 shadow-lg max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Готовим новые события</h3>
                            <p className="text-gray-600 text-sm">Организаторы работают над интересными мероприятиями</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Качество важнее количества</h3>
                            <p className="text-gray-600 text-sm">Мы отбираем только самые интересные события</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Coffee className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">Время для отдыха</h3>
                            <p className="text-gray-600 text-sm">Идеальный момент для планирования будущих походов</p>
                        </div>
                    </div>
                </div>

                {/* Что можно сделать */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl p-8 text-white mb-12">
                    <h3 className="text-2xl font-bold mb-6">А пока можно:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-sm font-bold">📧</span>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Подписаться на уведомления</h4>
                                <p className="text-purple-100 text-sm">Узнавайте первыми о новых событиях</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-sm font-bold">💡</span>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Предложить событие</h4>
                                <p className="text-purple-100 text-sm">Знаете интересное мероприятие? Расскажите нам!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                        Подписаться на уведомления
                    </Button>

                    <Button
                        variant="outline"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full font-semibold transition-all duration-300"
                        onClick={() => window.location.reload()}
                    >
                        Обновить страницу
                    </Button>
                </div>
            </div>
    )
}
