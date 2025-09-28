"use client"

import {useState} from "react"
import type {Event} from "@/lib/types"
import {Button} from "@/components/ui/button"
import {Calendar, Clock, MapPin, X, Info, CreditCard} from "lucide-react"
import {formatDate, formatTime} from "@/lib/utils"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge";

interface EventCardProps {
    event: Event
}

function getEventDateStatus(eventDate: string): "today" | "tomorrow" | "other" {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const event = new Date(eventDate)

    const todayStr = today.toDateString()
    const tomorrowStr = tomorrow.toDateString()
    const eventStr = event.toDateString()

    if (eventStr === todayStr) return "today"
    if (eventStr === tomorrowStr) return "tomorrow"
    return "other"
}

export default function EventCard({event}: EventCardProps) {
    const [showDescription, setShowDescription] = useState(false)
    const dateStatus = getEventDateStatus(event.date)

    const getBorderStyles = () => {
        switch (dateStatus) {
            case "today":
                return "border-green-400 border-2 shadow-green-400/20 shadow-lg"
            case "tomorrow":
                return "border-yellow-400 border-2 shadow-yellow-400/20 shadow-lg"
            default:
                return "border-purple-500/20"
        }
    }

    const getDateStatusText = () => {
        switch (dateStatus) {
            case "today":
                return "Сегодня!"
            case "tomorrow":
                return "Уже завтра!"
            default:
                return null
        }
    }
    const getDateStatusColor = () => {
        switch (dateStatus) {
            case "today":
                return "bg-green-500 text-white"
            case "tomorrow":
                return "bg-yellow-500 text-black"
            default:
                return ""
        }
    }

    const statusText = getDateStatusText()
    return (
        <Card
            className={`bg-white/10 backdrop-blur-md ${getBorderStyles()} overflow-hidden rounded-3xl hover:shadow-lg hover:shadow-purple-500/10 transition-all group h-full flex flex-col relative`}>
            {statusText && (
                <div className="absolute top-4 left-4 z-20">
                    <Badge
                        className={`${getDateStatusColor()} px-3 py-1 text-sm font-bold shadow-lg hover:bg-purple-700`}>
                        {statusText}
                    </Badge>
                </div>
            )}
            {showDescription && (
                <div
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 rounded-3xl flex items-center justify-center p-6">
                    <div className="text-center">
                        <button
                            onClick={() => setShowDescription(false)}
                            className="absolute top-4 right-4 w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white"
                        >
                            <X className="w-4 h-4"/>
                        </button>
                        <h3 className="text-white text-xl font-bold mb-4">{event.title}</h3>
                        <p className="text-purple-200 leading-relaxed">{event.description}</p>
                    </div>
                </div>
            )}

            <div className="relative h-48 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{backgroundImage: `url(${event.image})`}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button
                    onClick={() => setShowDescription(true)}
                    className="absolute top-4 right-4 w-8 h-8 bg-purple-600/80 hover:bg-purple-600 rounded-full flex items-center justify-center text-white transition-all"
                >
                    <Info className="w-4 h-4"/>
                </button>
            </div>

            <CardHeader className="pb-4 flex-grow">
                <CardTitle className="text-white text-lg line-clamp-2 min-h-[3.5rem] mb-3">{event.title}</CardTitle>
                <CardDescription className="text-purple-300 mb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2 flex-1 min-w-0">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400"/>
                            <div className="text-sm leading-tight min-w-0">
                                <div className="break-words">{(event.location == '0') ? 'г. Йошкар-Ола' : event.location }</div>
                            </div>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pb-4">
                <div className="flex justify-between text-sm">
                    <div className="flex items-center text-purple-300">
                        <Calendar className="w-4 h-4 mr-2"/>
                        <span>{formatDate(event.date)}</span>
                    </div>
                    {(event.time !== '00:00') ?
                        (<div className="flex items-center text-purple-300">
                            <Clock className="w-4 h-4 mr-2"/>
                            <span>{formatTime(event.time)}</span>
                        </div>) : ''}
                </div>
                <div className="flex items-center text-purple-300">
                    {event.price > 100
                        ? (<>
                            <CreditCard className="w-4 h-4 mr-2 text-emerald-400"/>
                            <span className="text-white font-bold">{event.price} ₽</span>
                        </>)
                        : <span className="text-white font-bold">Цену уточняйте у организатора</span>}
                </div>
            </CardContent>

            <CardFooter className="pt-0 mt-auto">
                <Button isHref={true} href={event.detail}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-3">Подробнее</Button>
            </CardFooter>
        </Card>
    )
}
