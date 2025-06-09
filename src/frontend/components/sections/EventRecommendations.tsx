import { Heart, Star, TrendingUp, Users, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function EventRecommendations() {
  const recommendations = [
    {
      icon: Heart,
      title: "Для романтиков",
      description: "Идеальные мероприятия для свиданий",
      events: ["Джаз-концерт", "Винная дегустация", "Танго-вечер"],
      color: "from-pink-500 to-rose-500",
      count: 12,
    },
    {
      icon: Users,
      title: "Для компании друзей",
      description: "Веселые активности для большой компании",
      events: ["Квизы", "Караоке", "Боулинг"],
      color: "from-blue-500 to-cyan-500",
      count: 18,
    },
    {
      icon: Star,
      title: "Премиум события",
      description: "Эксклюзивные мероприятия высокого уровня",
      events: ["VIP концерты", "Закрытые показы", "Гала-ужины"],
      color: "from-yellow-500 to-orange-500",
      count: 8,
    },
    {
      icon: Clock,
      title: "Быстрые мероприятия",
      description: "События до 2 часов для занятых людей",
      events: ["Экспресс-лекции", "Короткие спектакли", "Мини-концерты"],
      color: "from-green-500 to-emerald-500",
      count: 15,
    },
    {
      icon: TrendingUp,
      title: "Популярное сейчас",
      description: "Самые востребованные события недели",
      events: ["Стендап", "Мастер-классы", "Фестивали"],
      color: "from-purple-500 to-indigo-500",
      count: 22,
    },
    {
      icon: Zap,
      title: "Экстремальные",
      description: "Для любителей острых ощущений",
      events: ["Квесты", "Экстрим-спорт", "Хоррор-шоу"],
      color: "from-red-500 to-pink-500",
      count: 9,
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Плавный переход сверху */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-purple-900/60"></div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Рекомендации для вас</h2>
          </div>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Найдите идеальное мероприятие под ваше настроение и предпочтения. Мы подобрали события для любого случая
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${rec.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <rec.icon className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-purple-600/50 text-white px-3 py-1">{rec.count} событий</Badge>
              </div>

              <h3 className="text-white text-xl font-bold mb-2">{rec.title}</h3>
              <p className="text-purple-300 text-sm mb-4">{rec.description}</p>

              <div className="space-y-2 mb-4">
                {rec.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-200 text-sm">{event}</span>
                  </div>
                ))}
              </div>

              <Button
                size="sm"
                className="w-full bg-purple-600/80 hover:bg-purple-600 text-white rounded-full py-2 group-hover:bg-purple-700 transition-colors"
              >
                Смотреть события
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6">
            <Star className="w-5 h-5 mr-2" />
            Персональные рекомендации
          </Button>
        </div>
      </div>

      {/* Плавный переход снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/30 to-purple-900/60"></div>
      </div>
    </section>
  )
}
