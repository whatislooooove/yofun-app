export function EventsHeader() {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-gray-900/80 z-10"></div>

            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }}
            ></div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Все развлечения в Йошкар-Оле</h1>
                    <p className="text-xl text-purple-200 mb-8">
                        Откройте для себя бесконечные возможности для отдыха и развлечений в нашем городе
                    </p>
                </div>
            </div>
        </section>
    )
}
