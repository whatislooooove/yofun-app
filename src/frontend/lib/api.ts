import type {Event, Quiz} from "./types"

// Базовый URL для API (добавьте в .env файл)
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cityevents.ru'

export interface IndexData {
    sliderEvents: Event[]
    upcomingEvents: Event[]
    upcomingQuizzes: Quiz[]
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