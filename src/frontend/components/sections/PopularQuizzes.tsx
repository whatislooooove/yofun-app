import type {Event, Quiz} from "@/lib/types"
import QuizCard from "@/components/common/QuizCard"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface PopularQuizzesProps {
  quizzes: Event[]
}

export default function PopularQuizzes({ quizzes }: PopularQuizzesProps) {
  return (
    <section className="py-16 relative">
      {/* Плавный переход сверху */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/40 rounded-b-[3rem]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Актуальные квизы</h2>
          <div className="flex items-center space-x-2">
            <span className="text-purple-300 font-medium hidden md:inline">Все квизы</span>
            <Button variant="ghost" size="icon" className="rounded-full bg-purple-600/20 hover:bg-purple-600/40">
              <ChevronRight className="h-5 w-5 text-purple-300" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.slice(0, 4).map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>

      {/* Плавный переход снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-900/40 rounded-t-[3rem]"></div>
      </div>
    </section>
  )
}
