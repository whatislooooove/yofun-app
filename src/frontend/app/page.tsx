import type { Metadata } from "next"
import Header from "@/components/sections/Header"
import EventSlider from "@/components/sections/EventSlider"
import TodayEvents from "@/components/sections/TodayEvents"
import PopularQuizzes from "@/components/sections/PopularQuizzes"
import EmptyState from "@/components/sections/EmptyState"
import Footer from "@/components/sections/Footer"
import { getIndexData } from "@/lib/api"

export const metadata: Metadata = {
    title: "Афиша уникальных мероприятий в Йошкар-Оле - малоизвестные события и мероприятия в нашем городе",
    description:
        "Уникальная платформа, где вы найдете множество интересных и малоизвестных событий, мероприятий, выставок и фестивалей. Найдите скрытые жемчужины культурной жизни города, необычные активности и развлечения.",
    keywords:
        "малоизвестные события, скрытые мероприятия, интересные места, культурные события, необычные развлечения, афиша города, что посетить сегодня, уникальные мероприятия, камерные концерты, арт-события",
    openGraph: {
        title: "Афиша уникальных мероприятий в Йошкар-Оле - малоизвестные события и мероприятия в нашем городе",
        description: "Уникальная платформа, где собраны самые интересные и малоизвестные мероприятия в городе",
        url: "https://yofun.ru",
        images: [
            {
                url: "/og-home.jpg",
                width: 1200,
                height: 630,
                alt: "Главная страница yofun - уникальные малоизвестные события",
            },
        ],
    },
    alternates: {
        canonical: "https://yofun.ru",
    },
    other: {
        "article:section": "Главная",
        "page-topic": "События и мероприятия",
        "page-type": "Каталог событий",
        audience: "Жители города, туристы, любители культуры",
        "content-language": "ru",
        "geo.region": "RU",
        "geo.placename": "Россия",
    },
}

export default async function HomePage() {
   const indexData = await getIndexData()

    const hasSliderEvents = indexData.sliderEvents && indexData.sliderEvents.length > 0
    const hasUpcomingEvents = indexData.upcomingEvents && indexData.upcomingEvents.length > 0
    const hasUpcomingQuizzes = indexData.upcomingQuizzes && indexData.upcomingQuizzes.length > 0
    const isNoEvent = (!hasSliderEvents && !hasUpcomingEvents && !hasUpcomingQuizzes)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
      <Header todayEventsCount={indexData.meta.todayEvents} />
      <main>
          {isNoEvent ? (<EmptyState />) : (
              <>
                  <EventSlider events={indexData.sliderEvents} />
                  <TodayEvents events={indexData.upcomingEvents} />
                  <PopularQuizzes quizzes={indexData.upcomingQuizzes} />
              </>)}
      </main>
      <Footer totalEventsCount={indexData.meta.totalEvents} />
    </div>
  )
}
