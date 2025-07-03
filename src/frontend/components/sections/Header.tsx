import Link from "next/link"
import {Calendar} from "lucide-react"
import {Badge} from "@/components/ui/badge";
import { getStaticData} from "@/lib/api";

export default async function Header({todayEventsCount = false}: {
    todayEventsCount?: number | boolean;
}) {
    const staticData = (todayEventsCount === false) ? (await getStaticData()).todayEvents : todayEventsCount

    return (
        <header className="bg-indigo-950/90 backdrop-blur-md border-b border-purple-800/20 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div
                            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white"/>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">yofun</h1>
                            <p className="text-xs text-purple-300">Мероприятия Йошкар-Олы</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/events" className="text-purple-200 hover:text-white transition-colors">
                            Мероприятия
                        </Link>
                        <Link href="/quizzes" className="text-purple-200 hover:text-white transition-colors">
                            Квизы
                        </Link>
                        <Link href="/about" className="text-purple-200 hover:text-white transition-colors">
                            О нас
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {(staticData == 0) ? (<div className="hidden md:flex items-center space-x-3">
                            <Badge className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30">
                                <div className="text-sm">
                                    <div className="text-xs">На сегодня мерпориятий нет</div>
                                </div>
                            </Badge>
                        </div>) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Badge
                                    className="bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                    <div className="text-sm">
                                        <div className="font-medium">Сегодня</div>
                                        <div className="text-xs">{staticData} событий</div>
                                    </div>
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
