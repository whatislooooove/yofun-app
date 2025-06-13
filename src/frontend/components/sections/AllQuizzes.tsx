import type {Quiz} from "@/lib/types"
import QuizCard from "@/components/common/QuizCard"

interface PopularQuizzesProps {
    quizzes: Quiz[]
}

export default function AllQuizzes({quizzes}: PopularQuizzesProps) {
    return (
        <section className="pb-16 relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex justify-between items-center mt-12 mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Все квизы</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz}/>
                    ))}
                </div>
            </div>

            {/* Плавный переход снизу */}
            <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
            </div>
        </section>
    )
}
