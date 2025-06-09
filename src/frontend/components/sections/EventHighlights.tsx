import { Trophy, Flame, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function EventHighlights() {
  const highlights = [
    {
      icon: Trophy,
      title: "Событие месяца",
      subtitle: "Международный фестиваль джаза",
      description: "Легендарные музыканты со всего мира соберутся в нашем городе",
      date: "15-17 июня",
      price: "от 2500₽",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Премиум",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Flame,
      title: "Горячая новинка",
      subtitle: "Иммерсивный театр 'Алиса'",
      description: "Уникальный спектакль, где зрители становятся частью истории",
      date: "Каждые выходные",
      price: "от 1800₽",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Новинка",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Народный выбор",
      subtitle: "Квиз 'Что? Где? Когда?'",
      description: "Самый популярный интеллектуальный турнир города",
      date: "Каждую среду",
      price: "от 400₽",
      image: "/placeholder.svg?height=300&width=400",
      badge: "Хит",
      color: "from-blue-500 to-purple-500",
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Плавный переход сверху */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/60 rounded-b-[3rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Особые события</h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Самые яркие и запоминающиеся мероприятия, которые нельзя пропустить
          </p>
        </div>

        {/* Основные события */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden hover:bg-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${highlight.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-gradient-to-r ${highlight.color} text-white px-3 py-1`}>
                    {highlight.badge}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${highlight.color} rounded-full flex items-center justify-center`}
                  >
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="text-purple-300 text-sm mb-2">{highlight.title}</div>
                <h3 className="text-white text-xl font-bold mb-3">{highlight.subtitle}</h3>
                <p className="text-purple-200 text-sm mb-4 leading-relaxed">{highlight.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-purple-300 text-sm">
                    <div className="font-medium">{highlight.date}</div>
                  </div>
                  <div className="text-white font-bold">{highlight.price}</div>
                </div>

                <Button className="w-full bg-purple-600/80 hover:bg-purple-600 text-white rounded-full py-2">
                  Подробнее
                </Button>
              </div>
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
