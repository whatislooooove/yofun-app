import { Calendar, Users, Star, TrendingUp } from "lucide-react"

export default function EventStats() {
  const stats = [
    {
      icon: Calendar,
      value: "150+",
      label: "Мероприятий в месяц",
      description: "Концерты, выставки, квизы и многое другое",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      value: "25K+",
      label: "Активных участников",
      description: "Присоединяйтесь к нашему сообществу",
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Star,
      value: "4.8",
      label: "Средний рейтинг",
      description: "Оценка качества мероприятий",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Довольных гостей",
      description: "Рекомендуют нас друзьям",
      color: "from-green-500 to-teal-500",
    },
  ]

  return (
    <section className="py-16 bg-indigo-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">CityEvents в цифрах</h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Мы создаем незабываемые впечатления и объединяем людей через качественные мероприятия
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-purple-200 mb-2">{stat.label}</div>
              <div className="text-sm text-purple-300">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
