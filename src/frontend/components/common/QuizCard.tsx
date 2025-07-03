"use client"

import { useState } from "react"
import type { Quiz } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, X, Info } from "lucide-react"
import { formatDate, formatTime } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface QuizCardProps {
  quiz: Quiz
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <Card className="bg-white/10 backdrop-blur-md border-purple-500/20 overflow-hidden rounded-3xl hover:shadow-lg hover:shadow-purple-500/10 transition-all group h-full flex flex-col relative">
      {/* Overlay для описания */}
      {showDescription && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 rounded-3xl flex items-center justify-center p-6">
          <div className="text-center">
            <button
              onClick={() => setShowDescription(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-white text-xl font-bold mb-4">{quiz.title}</h3>
            <p className="text-purple-200 leading-relaxed">
              {quiz.description}
            </p>
          </div>
        </div>
      )}

      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${quiz.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center">
          <Badge className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full">Квиз</Badge>
          {quiz.extra?.franchise
              ? (<Badge className="bg-orange-600 hover:bg-orange-700 text-white ml-1 px-3 py-1 rounded-full">{quiz.extra.franchise}</Badge>)
              : ''}
          <span className="text-white font-bold ml-auto">{quiz.price} ₽</span>
        </div>
        {/* Кнопка показать описание */}
        <button
          onClick={() => setShowDescription(true)}
          className="absolute top-4 right-4 w-8 h-8 bg-purple-600/80 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-all"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-white text-lg line-clamp-2 min-h-[3.5rem] mb-3">{quiz.title}</CardTitle>
        <CardDescription className="text-purple-300 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2 flex-1 min-w-0">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400" />
              <div className="text-sm leading-tight min-w-0">
                <div className="break-words">{quiz.location}</div>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 flex-grow pb-4">
        <div className="flex justify-between text-sm">
          <div className="flex items-center text-purple-300">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(quiz.date)}</span>
          </div>
          <div className="flex items-center text-purple-300">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatTime(quiz.time)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button isHref={true} href={quiz.detail} className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3" target="_blank">
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  )
}
