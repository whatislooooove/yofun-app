import { Music, Palette, Brain, Camera, Gamepad2, Theater } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PopularCategories() {
  const categories = [
    {
      icon: Music,
      name: "Концерты",
      count: 45,
      color: "from-pink-500 to-rose-500",
      bgPattern: "🎵",
    },
    {
      icon: Brain,
      name: "Квизы",
      count: 32,
      color: "from-purple-500 to-indigo-500",
      bgPattern: "🧠",
    },
    {
      icon: Palette,
      name: "Выставки",
      count: 28,
      color: "from-blue-500 to-cyan-500",
      bgPattern: "🎨",
    },
    {
      icon: Theater,
      name: "Театр",
      count: 18,
      color: "from-red-500 to-pink-500",
      bgPattern: "🎭",
    },
    {
      icon: Camera,
      name: "Мастер-классы",
      count: 24,
      color: "from-green-500 to-emerald-500",
      bgPattern: "📸",
    },
    {
      icon: Gamepad2,
      name: "Игры",
      count: 15,
      color: "from-orange-500 to-yellow-500",
      bgPattern: "🎮",
    },
  ]

  return (
    <section className="py-16 relative">
      {/* Плавный переход сверху */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/60 rounded-b-[3rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Популярные категории</h2>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Выберите то, что вам по душе, и откройте для себя мир увлекательных мероприятий
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Button key={index} variant="ghost" className="h-auto p-0 hover:scale-105 transition-all duration-300">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 w-full text-center relative overflow-hidden group hover:bg-white/15">
                {/* Декоративный фон */}
                <div className="absolute top-2 right-2 text-2xl opacity-20 group-hover:opacity-30 transition-opacity">
                  {category.bgPattern}
                </div>

                <div
                  className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>

                <div className="text-white font-semibold mb-1 group-hover:text-white">{category.name}</div>
                <div className="text-purple-300 text-sm group-hover:text-purple-200">{category.count} событий</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 py-6">
            Посмотреть все категории
          </Button>
        </div>
      </div>

      {/* Плавный переход снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-indigo-950/60 rounded-t-[3rem]"></div>
      </div>
    </section>
  )
}
