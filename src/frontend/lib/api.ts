import type {Event, Quiz} from "./types"

// Базовый URL для API (добавьте в .env файл)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cityevents.ru'

export interface IndexData {
    sliderEvents: Event[]
    todayEvents: Event[]
    todayQuizzes: Quiz[]
}

export async function getIndexData(): Promise<IndexData> {
    /*
     * РЕАЛЬНАЯ РЕАЛИЗАЦИЯ:
     *
     * try {
     *   const response = await fetch(`${API_BASE_URL}/quizzes/popular`)
     *   const data = await response.json()
     *   return data.quizzes
     * } catch (error) {
     *   console.error('Error fetching popular quizzes:', error)
     *   return []
     * }
     */

    try {
        const response = await fetch(`http://server-nginx:80/api/v1/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    } catch (error) {
        console.error('Error:', error)
    }

    return {
        sliderEvents: events,
        todayEvents: events,
        todayQuizzes: events,
    };
}

/*
 * ДОПОЛНИТЕЛЬНЫЕ API ФУНКЦИИ ДЛЯ РАСШИРЕНИЯ:
 *
 * export async function getEventById(id: string): Promise<Event | null> {
 *   const response = await fetch(`${API_BASE_URL}/events/${id}`)
 *   return response.json()
 * }
 *
 * export async function getEventsByCategory(category: string): Promise<Event[]> {
 *   const response = await fetch(`${API_BASE_URL}/events?category=${category}`)
 *   return response.json()
 * }
 *
 * export async function searchEvents(query: string): Promise<Event[]> {
 *   const response = await fetch(`${API_BASE_URL}/events/search?q=${query}`)
 *   return response.json()
 * }
 */
