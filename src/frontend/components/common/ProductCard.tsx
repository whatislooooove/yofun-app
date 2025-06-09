import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div className={`${product.bgGradient} h-48 flex items-center justify-center`}>
            <div className="text-6xl font-bold text-white opacity-20">{product.displayCode}</div>
          </div>
          <div className="absolute top-4 left-4">
            <Badge className="bg-orange-500 text-white">{product.price}</Badge>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">{product.id.toString().padStart(2, "0")}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <p className="text-slate-400 text-sm mb-4">{product.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
