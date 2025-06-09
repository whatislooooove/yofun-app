import { Calendar, Clock, MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function WeeklySchedule() {
  const weekEvents = [
    {
      day: "ПН",
      date: "27",
      events: [
        {
          time: "19:00",
          title: "Квиз 'Кино 90-х'",
          location: "Бар Квиз",
          price: 500,
          category: "Квиз",
        },
        {
          time: "20:30",
          title: "Джаз вечер",
          location: "Клуб Блюз",
          price: 800,
          category: "Концерт",
        },
      ],
    },
    {
      day: "ВТ",
      date: "28",
      events: [
        {
          time: "18:00",
          title: "Мастер-класс керамики",
          location: "Арт-студия",
          price: 800,
          category: "Мастер-класс",
        },
        {
          time: "19:30",
          title: "Стендап шоу",
          location: "Комеди клаб",
          price: 600,
          category: "Шоу",
        },
      ],
    },
    {
      day: "СР",
      date: "29",
      events: [
        {
          time: "17:00",
          title: "Лекция об искусстве",
          location: "Библиотека",
          price: 200,
          category: "Лекция",
        },
        {
          time: "20:00",
          title: "Танцевальный вечер",
          location: "Студия танца",
          price: 400,
          category: "Танцы",
        },
      ],
    },
    {
      day: "ЧТ",
      date: "30",
      events: [
        {
          time: "18:30",
          title: "Фотовыставка",
          location: "Галерея",
          price: 300,
          category: "Выставка",
        },
        {
          time: "19:00",
          title: "Винная дегустация",
          location: "Винотека",
          price: 1200,
          category: "Дегустация",
        },
      ],
    },
    {
      day: "ПТ",
      date: "31",
      events: [
        {
          time: "19:00",
          title: "Концерт рок-группы",
          location: "Клуб Рок",
          price: 900,
          category: "Концерт",
        },
        {
          time: "21:00",
          title: "Ночная вечеринка",
          location: "Клуб Неон",
          price: 700,
          category: "Вечеринка",
        },
      ],
    },
    {
      day: "СБ",
      date: "01",
      events: [
        {
          time: "14:00",
          title: "Семейный квест",
          location: "Парк",
          price: 500,
          category: "Квест",
        },
        {
          time: "20:00",
          title: "Театральная премьера",
          location: "Театр",
          price: 1500,
          category: "Театр",
        },
      ],
    },
    {
      day: "ВС",
      date: "02",
      events: [
        {
          time: "11:00",
          title: "Йога на природе",
          location: "Парк",
          price: 300,
          category: "Спорт",
        },
        {
          time: "16:00",
          title: "Детский спектакль",
          location: "Театр",
          price: 400,
          category: "Театр",
        },
      ],
    },
  ]

  // Группируем дни по парам
  const groupedDays = []
  for (let i = 0; i < weekEvents.length; i += 2) {
    groupedDays.push(weekEvents.slice(i, i + 2))
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Плавный переход сверху */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/60 rounded-b-[3rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Расписание на неделю</h2>
          </div>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Планируйте свой досуг заранее! Посмотрите, какие интересные мероприятия ждут вас на этой неделе
          </p>
        </div>

        <div className="space-y-6">
          {groupedDays.map((dayPair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dayPair.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-white">{day.day}</div>
                    <div className="text-purple-300 text-lg">{day.date} мая</div>
                  </div>

                  <div className="space-y-4">
                    {day.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="bg-purple-900/30 rounded-2xl p-4 hover:bg-purple-900/50 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <Badge className="bg-purple-600/50 text-white text-xs px-2 py-1">{event.category}</Badge>
                          <span className="text-white font-bold text-sm">{event.price} ₽</span>
                        </div>

                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-300 text-sm font-medium">{event.time}</span>
                        </div>

                        <h4 className="text-white text-lg font-semibold mb-3 line-clamp-2">{event.title}</h4>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-sm truncate">{event.location}</span>
                          </div>
                          <Button
                            size="icon"
                            className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-md"
                          >
                            <Navigation className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          className="w-full bg-purple-600/80 hover:bg-purple-600 text-white rounded-full py-2"
                        >
                          Подробнее
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
