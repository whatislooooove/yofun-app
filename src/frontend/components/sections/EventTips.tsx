import { Lightbulb, Clock, Heart, Star, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EventTips() {
  const tips = [
    {
      icon: Clock,
      title: "Планируйте заранее",
      description: "Покупайте билеты за 1-2 недели до мероприятия",
      tip: "Скидки до 30% на раннее бронирование",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Создавайте воспоминания",
      description: "Приходите с друзьями и делитесь впечатлениями",
      tip: "Групповые скидки от 4 человек",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Star,
      title: "Выбирайте качество",
      description: "Читайте отзывы и рейтинги мероприятий",
      tip: "События с рейтингом 4.5+ особенно рекомендуем",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Знакомьтесь с людьми",
      description: "Мероприятия - отличный способ найти единомышленников",
      tip: "Присоединяйтесь к нашему сообществу в Telegram",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Gift,
      title: "Дарите эмоции",
      description: "Билеты на мероприятия - лучший подарок",
      tip: "Подарочные сертификаты доступны от 500₽",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Lightbulb,
      title: "Пробуйте новое",
      description: "Выходите из зоны комфорта и открывайте новые жанры",
      tip: "Каждый месяц добавляем 20+ новых форматов",
      color: "from-red-500 to-pink-500",
    },
  ]

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Элегантный переход сверху */}
      <div className="absolute top-0 left-0 right-0 h-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/0 to-purple-900/40 rounded-b-[3rem]"></div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Lightbulb className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Полезные советы</h2>
          </div>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Как получить максимум удовольствия от посещения мероприятий и сэкономить при этом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${tip.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <tip.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-white text-xl font-bold mb-2">{tip.title}</h3>
              <p className="text-purple-300 text-sm mb-4">{tip.description}</p>

              <div className="bg-purple-900/30 rounded-2xl p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-purple-200 text-sm font-medium">{tip.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6">
            <Lightbulb className="w-5 h-5 mr-2" />
            Больше советов
          </Button>
        </div>
      </div>

      {/* Элегантный переход снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/0 to-purple-900/40 rounded-t-[3rem]"></div>
      </div>
    </section>
  )
}
