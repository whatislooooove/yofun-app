import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { COMPANY_BENEFITS } from "@/lib/constants"
import SolarPanelShowcase from "@/components/common/SolarPanelShowcase"

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">НЕМНОГО О НАС</h2>
            <p className="text-slate-400 mb-8">
              Наша команда уже 2 года успешно работает в сфере поставок энергетического оборудования. Мы
              специализируемся на комплексных решениях для бизнеса любого масштаба.
            </p>

            <div className="space-y-4 mb-8">
              {COMPANY_BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-full px-6">Подробнее</Button>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-sm">+7 (000) 000-00-00</span>
              </div>
            </div>
          </div>

          <SolarPanelShowcase />
        </div>
      </div>
    </section>
  )
}
