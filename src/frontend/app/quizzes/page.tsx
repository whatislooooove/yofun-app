import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import {getAllQuizzes} from "@/lib/api";
import AllQuizzes from "@/components/sections/AllQuizzes";
import {QuizzesHeader} from "@/components/sections/QuizzesHeader";
import Pagination from "@/components/common/Pagination";

export const metadata: Metadata = {
    title: "Все квизы Йошкар-Олы | Интеллектуальные игры и викторины",
    description:
        "Полный список интеллектуальных квизов и викторин в Йошкар-Оле. Найдите игру по интересам, соберите команду и проверьте свои знания!",
    keywords: "квизы, викторины, интеллектуальные игры, командные игры, паб-квизы, тематические квизы",
}

interface QuizzesPageProps {
    searchParams: {
        page?: string
    }
}

export default async function QuizzesPage({ searchParams }): Promise<QuizzesPageProps> {
    const currentPage = Number(searchParams.page) || 1
    const { quizzes, meta } = await getAllQuizzes({
        page: currentPage,
        limit: 12,
    })

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950">
            <Header/>
            <main>
                <QuizzesHeader />
                <AllQuizzes quizzes={quizzes} />
                <div className="mb-10">
                    <Pagination currentPage={currentPage} totalPages={meta.totalPages} />
                </div>
            </main>
            <Footer/>
        </div>
    )
}