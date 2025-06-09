import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-indigo-950/90 backdrop-blur-md border-b border-purple-800/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">yofun</h1>
              <p className="text-xs text-purple-300">Мероприятия Йошкар-Олы</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-purple-200 hover:text-white transition-colors">
              Мероприятия
            </Link>
            <Link href="/quizzes" className="text-purple-200 hover:text-white transition-colors">
              Квизы
            </Link>
            <Link href="/about" className="text-purple-200 hover:text-white transition-colors">
              О нас
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-purple-300 text-sm">
                <div className="font-medium">Сегодня</div>
                <div className="text-xs">12 событий</div>
              </div>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
              <MapPin className="w-4 h-4 mr-2" />
              Карта
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
