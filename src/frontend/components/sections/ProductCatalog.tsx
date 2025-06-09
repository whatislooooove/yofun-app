import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "@/components/common/ProductCard"
import { PRODUCTS } from "@/lib/data"

export default function ProductCatalog() {
  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">КАТАЛОГ ОБОРУДОВАНИЯ</h2>
            <p className="text-slate-400 max-w-2xl">
              В нашем каталоге — только проверенное энергетическое оборудование для стабильной работы вашего бизнеса.
              Подберем решение под ваши задачи и бюджет.
            </p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 rounded-full px-6">Вся продукция</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          <Button variant="ghost" size="icon" className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
