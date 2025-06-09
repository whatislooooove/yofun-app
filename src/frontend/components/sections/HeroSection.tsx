import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import StatsDisplay from "@/components/common/StatsDisplay"
import EnergyTower from "@/components/common/EnergyTower"
import { COMPANY_STATS } from "@/lib/constants"

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-slate-400">О НАС НА САЙТЕ</span>
            </div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-slate-400">Москва ул. Ленинская дом 5, офис 3 этаж 4</span>
            </div>

            <div className="flex space-x-4 mb-8">
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                Оборудование
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                Энергия
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                Профессионально
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              ЭНЕРГЕТИЧЕСКОЕ
              <br />
              ОБОРУДОВАНИЕ ДЛЯ
              <br />
              ВАШЕГО БИЗНЕСА
            </h1>

            <p className="text-slate-300 mb-8 max-w-md">
              Комплексные решения для энергетической отрасли. Поставка качественного оборудования по всей России.
              Гарантия качества и профессиональный сервис.
            </p>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full">
              Обратный звонок
            </Button>

            <StatsDisplay stats={COMPANY_STATS} />
          </div>

          <EnergyTower />
        </div>
      </div>
    </section>
  )
}
