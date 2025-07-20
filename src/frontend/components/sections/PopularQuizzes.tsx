import type {Quiz} from "@/lib/types"
import QuizCard from "@/components/common/QuizCard"
import { Button } from "@/components/ui/button"
import { ChevronRight, Brain } from "lucide-react"

interface PopularQuizzesProps {
  quizzes: Quiz[]
}

export default function PopularQuizzes({ quizzes }: PopularQuizzesProps) {
  return (
    <section className="pb-16 relative">
        <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-2xl">
                    <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Актуальные квизы</h2>
                    <p className="text-purple-300 mt-2 text-lg">Интеллектуальные игры для компании друзей</p>
                </div>
            </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-300 font-medium hidden md:inline">Все квизы</span>
            <Button isHref={true} href="/quizzes" variant="ghost" size="icon" className="rounded-full bg-purple-600/20 hover:bg-purple-600/40">
              <ChevronRight className="h-5 w-5 text-purple-300" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
      </div>
    </section>
  )
}
