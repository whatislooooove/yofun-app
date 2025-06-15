import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import {getAllEvents} from "@/lib/api";
import AllEvents from "@/components/sections/AllEvents";
import {EventsHeader} from "@/components/sections/EventsHeader";
import Pagination from "@/components/common/Pagination";

export const metadata: Metadata = {
    title: "Все мероприятия Йошкар-Олы | Концерты, выставки и многое другое",
    description:
        "Полный список всех мероприятий в Йошкар-Оле. Найдите развлечение по интересам, зовите друзей и наслаждайтесь моментом!",
    keywords: "малоизвестные события, скрытые мероприятия, интересные места, культурные события, необычные развлечения, афиша города, что посетить сегодня, уникальные мероприятия, камерные концерты, арт-события",
}

interface EventsPageProps {
    searchParams: {
        page?: string
    }
}

export default async function EventsPage({ searchParams }): Promise<EventsPageProps> {
    const currentPage = Number(searchParams.page) || 1
    const { events, meta } = await getAllEvents({
        page: currentPage,
        limit: 12,
    })

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
            <Header/>
            <main>
                <EventsHeader />
                <AllEvents events={events} />
                <div className="mb-10">
                    <Pagination currentPage={currentPage} totalPages={meta.totalPages} />
                </div>
            </main>
            <Footer/>
        </div>
    )
}