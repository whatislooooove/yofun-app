import TestimonialCard from "@/components/common/TestimonialCard"
import { TESTIMONIALS } from "@/lib/data"

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">ОТЗЫВЫ НАШИХ КЛИЕНТОВ</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
