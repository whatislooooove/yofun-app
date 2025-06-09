"use client"
import type { Event } from "@/lib/types"
import EventCard from "@/components/common/EventCard"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface TodayEventsProps {
  events: Event[]
}

export default function TodayEvents({ events }: TodayEventsProps) {
  return (
    <section className="py-16 relative">
      {/* Плавный переход сверху */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/60 rounded-b-[3rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Мероприятия сегодня</h2>
          <div className="flex items-center space-x-2">
            <span className="text-purple-300 font-medium hidden md:inline">Все мероприятия</span>
            <Button variant="ghost" size="icon" className="rounded-full bg-purple-600/20 hover:bg-purple-600/40">
              <ChevronRight className="h-5 w-5 text-purple-300" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Плавный переход снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-indigo-950/60 rounded-t-[3rem]"></div>
      </div>
    </section>
  )
}
