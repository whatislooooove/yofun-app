"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types"
import { formatDate, formatTime } from "@/lib/utils"

interface EventSliderProps {
  events: Event[]
}

export default function EventSlider({ events }: EventSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-4">
        {/* Заголовок с кнопками навигации */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ближайшие события</h2>
          </div>

          {/* Кнопки навигации */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all border border-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
              )}
            >
              {/* Улучшенный градиент для лучшей читаемости */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10"></div>
              <div className="absolute inset-0 bg-black/20 z-10"></div>

              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.image})` }}
              ></div>

              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4 md:px-20">
                  <div className="max-w-2xl p-6">
                    {/* Улучшенная контрастность текста */}
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full shadow-lg">
                        {event.category}
                      </Badge>
                      <span className="text-lg font-bold text-white drop-shadow-lg">
                        {formatDate(event.date)} | {formatTime(event.time)}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{event.title}</h3>

                    <p className="text-gray-100 mb-6 text-lg drop-shadow-md">
                      {event.description.substring(0, 150)}...
                    </p>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 mb-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">₽</span>
                        </div>
                        <span className="text-white font-bold drop-shadow-md">{event.price} ₽</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white drop-shadow-md">{event.location}</span>
                        <Button
                          size="icon"
                          className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg"
                        >
                          <Navigation className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 shadow-lg">
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Современные индикаторы слайдов */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/70",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
