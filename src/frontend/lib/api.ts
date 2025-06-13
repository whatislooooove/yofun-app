import type {Event, Quiz} from "./types"

// Базовый URL для API (добавьте в .env файл)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cityevents.ru'

export interface IndexData {
    sliderEvents: Event[]
    upcomingEvents: Event[]
    upcomingQuizzes: Quiz[]
}

export interface QuizzesData {
    data: Quiz[],
    links: PaginationLinks
    meta: {
        current_page: number,
        last_page: number
    }
}

// Типы для параметров запроса квизов
export interface QuizzesQueryParams {
    page?: number
    limit?: number
}

// Типы для ответа API со списком квизов
export interface QuizzesResponse {
    quizzes: Quiz[]
    paginationMeta: {
        totalPages: number
        totalItems: number
        currentPage: number
    }
    // totalPages: number
    // totalItems: number
    // currentPage: number
}

export async function getIndexData(): Promise<IndexData> {
    try {
        const response = await fetch(`http://server-nginx:80/api/v1/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return await response.json()
    } catch (error) {
        console.error('Error:', error)
    }
}

export async function getAllQuizzes(params: QuizzesQueryParams = {}): Promise<QuizzesResponse> {

    const {page = 1} = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        const response = await fetch(`http://server-nginx/api/v1/quizzes?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            next: {revalidate: 60}
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        return {
            quizzes: data.data,
            meta: {
                totalPages: data.meta.last_page,
                totalItems: data.meta.total,
                currentPage: data.meta.current_page
            }
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error)
        return {
            quizzes: [],
            meta: {
                totalPages: 0,
                totalItems: 0,
                currentPage: params.page || 1
            }
        }
    }

}
