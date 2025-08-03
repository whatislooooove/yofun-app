import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
    try {
        // Отправляем запрос на внешний API сервер, 422 не обрабатывает почему то, надо выяснить
        const response = await fetch(`${API_BASE_URL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body),
        })

        const data = await response.json()
        return NextResponse.json(
            {
                message: data.message,
            },
            { status: response.status },
        )
    } catch (error) {

        if (error instanceof TypeError && error.message.includes("fetch")) {
            return NextResponse.json({ error: "Не удается подключиться к серверу. Попробуйте позже." }, { status: 503 })
        }

        return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
    }
}
