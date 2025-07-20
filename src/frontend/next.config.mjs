/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем standalone режим для Docker
  output: 'standalone',

  // Оптимизация для продакшена
  compress: true,

  // Настройки изображений
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Переменные окружения
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Настройки для API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },

  // Настройки безопасности
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Отладка для поиска ошибок
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ESLint и TypeScript настройки
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
