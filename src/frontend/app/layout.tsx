import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Афиша уникальных мероприятий в Йошкар-Оле - малоизвестные события и мероприятия в вашем городе",
  description:
      "Откройте для себя уникальные и малоизвестные события, мероприятия, выставки и фестивали в вашем городе. Интересные места, скрытые жемчужины культурной жизни и необычные активности.",
  keywords:
      "события в городе, малоизвестные мероприятия, интересные события, культурные мероприятия, выставки, фестивали, концерты, театр, музеи, развлечения, досуг, афиша, что посетить, куда пойти",
  authors: [{ name: "Yofun Team" }],
  creator: "Yofun",
  publisher: "Yofun",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://yofun.ru",
    siteName: "yofun",
    title: "Афиша уникальных мероприятий в Йошкар-Оле - малоизвестные события и мероприятия в вашем городе",
    description:
        "Откройте для себя уникальные и малоизвестные события, мероприятия, выставки и фестивали в вашем городе. Интересные места и скрытые жемчужины культурной жизни.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Афиша уникальных мероприятий в Йошкар-Оле - малоизвестные события и мероприятия в вашем городе",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Афиша уникальных мероприятий в Йошкар-Оле - малоизвестные события и мероприятия в вашем городе",
    description: "Откройте для себя уникальные события и мероприятия в вашем городе",
    images: ["/twitter-image.jpg"],
    creator: "@cityevents_ru",
  },
  verification: {
    yandex: "yandex-verification-code-here",
    google: "google-site-verification-code-here",
  },
  alternates: {
    canonical: "https://yofun.ru",
    languages: {
      "ru-RU": "https://yofun.ru",
    },
  },
  category: "entertainment",
  classification: "Развлечения и досуг",
  other: {
    // Специфичные мета-теги для Яндекса
    "yandex-verification": "yandex-verification-code-here",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#6366f1",
    "msapplication-TileColor": "#6366f1",
    "msapplication-config": "/browserconfig.xml",
    // Геолокация для Яндекса
    "geo.region": "RU",
    "geo.placename": "Россия",
    ICBM: "56,6388, 47,8908", // Координаты Москвы как пример
    // Контент для Яндекса
    news_keywords: "события, мероприятия, культура, развлечения, досуг, афиша",
    "article:section": "Развлечения",
    "article:tag": "события, мероприятия, культура, развлечения",
    // Дополнительные теги для лучшей индексации
    "revisit-after": "1 day",
    distribution: "global",
    rating: "general",
    copyright: "Yofun",
    language: "Russian",
    "doc-type": "Web Page",
    "doc-rights": "Copywritten Work",
    "doc-class": "Living Document",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
      {/*
          ИНСТРУКЦИЯ ПО ДОБАВЛЕНИЮ ФАВИКОНОВ:

          1. Создайте файлы иконок в папке /public/:
             - favicon.ico (32x32, для старых браузеров)
             - favicon-16x16.png
             - favicon-32x32.png
             - apple-touch-icon.png (180x180, для iOS)
             - safari-pinned-tab.svg (векторная иконка для Safari)
             - og-image.jpg (1200x630, для социальных сетей)

          2. Создайте файлы манифеста:
             - site.webmanifest (для PWA)
             - browserconfig.xml (для Windows)

          3. Используйте онлайн генераторы фавиконов:
             - https://realfavicongenerator.net/
             - https://favicon.io/

          4. Для создания иконки можете использовать:
             - Логотип компании
             - Символ календаря или события
             - Первую букву названия "C"
        */}
    </head>
    <body>{children}</body>
    </html>
  )
}
