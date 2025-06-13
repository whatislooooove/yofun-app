"use client"

import React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Функция для создания URL с новой страницей
    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    // Функция для перехода на страницу
    const goToPage = (pageNumber: number) => {
        router.push(createPageURL(pageNumber))
    }

    // Генерация номеров страниц для отображения
    const getPageNumbers = () => {
        const pages = []

        // Всегда показываем первую страницу
        pages.push(1)

        // Добавляем текущую страницу и соседние
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (!pages.includes(i)) {
                pages.push(i)
            }
        }

        // Всегда показываем последнюю страницу, если страниц больше 1
        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages)
        }

        // Сортируем и возвращаем
        return pages.sort((a, b) => a - b)
    }

    const pageNumbers = getPageNumbers()

    // Если всего одна страница, не показываем пагинацию
    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="flex justify-center items-center space-x-2">
            {/* Кнопка "Назад" */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-purple-900/50 border-purple-500/30 text-white hover:bg-purple-800 hover:text-white"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Номера страниц */}
            <div className="flex space-x-1">
                {pageNumbers.map((pageNumber, index) => {
                    // Добавляем многоточие, если есть пропуски в последовательности
                    if (index > 0 && pageNumber > pageNumbers[index - 1] + 1) {
                        return (
                            <React.Fragment key={`ellipsis-${pageNumber}`}>
                                <span className="flex items-center justify-center w-10 h-10 text-purple-300">...</span>
                                <Button
                                    key={pageNumber}
                                    variant={currentPage === pageNumber ? "default" : "outline"}
                                    onClick={() => goToPage(pageNumber)}
                                    className={
                                        currentPage === pageNumber
                                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                                            : "bg-purple-900/50 border-purple-500/30 text-white hover:bg-purple-800 hover:text-white"
                                    }
                                >
                                    {pageNumber}
                                </Button>
                            </React.Fragment>
                        )
                    }

                    return (
                        <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            onClick={() => goToPage(pageNumber)}
                            className={
                                currentPage === pageNumber
                                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                                    : "bg-purple-900/50 border-purple-500/30 text-white hover:bg-purple-800 hover:text-white"
                            }
                        >
                            {pageNumber}
                        </Button>
                    )
                })}
            </div>

            {/* Кнопка "Вперед" */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-purple-900/50 border-purple-500/30 text-white hover:bg-purple-800 hover:text-white"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
