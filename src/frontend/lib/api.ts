import type {Event, Quiz} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface IndexData {
    sliderEvents: Event[]
    upcomingEvents: Event[]
    upcomingQuizzes: Quiz[]
}

export interface QueryParams {
    page?: number
    limit?: number
}

export interface QuizzesResponse {
    quizzes: Quiz[]
    paginationMeta: {
        totalPages: number
        totalItems: number
        currentPage: number
    }
}

export interface EventsResponse {
    events: Event[]
    paginationMeta: {
        totalPages: number
        totalItems: number
        currentPage: number
    }
}

export async function getIndexData(): Promise<IndexData> {
    try {
        const response = await fetch(API_BASE_URL, {
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

export async function getAllQuizzes(params: QueryParams = {}): Promise<QuizzesResponse> {

    const {page = 1} = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        const response = await fetch(`${API_BASE_URL}quizzes?${queryParams.toString()}`, {
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

export async function getAllEvents(params: QueryParams = {}): Promise<EventsResponse> {

    const {page = 1} = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        const response = await fetch(`${API_BASE_URL}events?${queryParams.toString()}`, {
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
            events: data.data,
            meta: {
                totalPages: data.meta.last_page,
                totalItems: data.meta.total,
                currentPage: data.meta.current_page
            }
        }
    } catch (error) {
        console.error('Error fetching events:', error)
        return {
            events: [],
            meta: {
                totalPages: 0,
                totalItems: 0,
                currentPage: params.page || 1
            }
        }
    }

}
