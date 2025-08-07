import type {Event, Quiz, Meta, DefaultMeta} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface IndexData {
    sliderEvents: Event[]
    upcomingEvents: Event[]
    upcomingQuizzes: Quiz[]
    meta: Meta
}

export interface StaticData {
    todayEvents: number
    totalEvents: number
}

export interface PostResponse {
    message: string
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
    meta: DefaultMeta
}

export interface EventsResponse {
    events: Event[]
    paginationMeta: {
        totalPages: number
        totalItems: number
        currentPage: number
    }
    meta: DefaultMeta
}

export async function getIndexData(): Promise<IndexData> {
    console.log('getting data')
    if (!API_BASE_URL) {
        throw new Error('API_BASE_URL is not defined');
    }
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache'
            },
            cache: 'no-store'
        })
        return await response.json()
    } catch (error) {
        console.error('Error:', error)
        return {
            meta: {
                todayEvents: 0,
                totalEvents: 0
            },
            sliderEvents: [],
            upcomingEvents: [],
            upcomingQuizzes: [],
        };
    }
}

export async function getAllQuizzes(params: QueryParams = {}): Promise<QuizzesResponse> {

    const {page = 1} = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        const response = await fetch(`${API_BASE_URL}/quizzes?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache'
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        return {
            paginationMeta: {currentPage: 0, totalItems: 0, totalPages: 0},
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
            paginationMeta: {currentPage: 0, totalItems: 0, totalPages: 0},
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
        const response = await fetch(`${API_BASE_URL}/events?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache'
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        return {
            paginationMeta: {currentPage: 0, totalItems: 0, totalPages: 0},
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
            paginationMeta: {currentPage: 0, totalItems: 0, totalPages: 0},
            events: [],
            meta: {
                totalPages: 0,
                totalItems: 0,
                currentPage: params.page || 1
            }
        }
    }

}

export async function getStaticData(): Promise<StaticData> {
    try {
        const response = await fetch(`${API_BASE_URL}/static`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            cache: 'no-store'
        })
        const data = await response.json()

        return {
            todayEvents: data.todayEvents,
            totalEvents: data.totalEvents
        }
    } catch (error) {
        console.error('Error:', error)
        return {
            todayEvents: 0,
            totalEvents: 0
        }
    }
}

export async function sendFeedback(data: any) {
     return await fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify(data)
    })
}
