import type {Event} from "@/lib/types"
import EventCard from "@/components/common/EventCard";
import EmptyState from "@/components/sections/EmptyState";

interface AllEventsProps {
    events: Event[]
}

export default function AllQuizzes({events}: AllEventsProps) {
    return (events.length == 0 ? (<EmptyState />) :
        <section className="pb-16 relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex justify-between items-center mt-12 mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Все мероприятия</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event}/>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
            </div>
        </section>
    )
}
