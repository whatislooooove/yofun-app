import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import type { Testimonial } from "@/lib/types"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
            <AvatarFallback>{testimonial.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-bold">{testimonial.name}</div>
            <div className="flex space-x-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-slate-300 text-sm">{testimonial.text}</p>
      </CardContent>
    </Card>
  )
}
