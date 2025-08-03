/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем standalone режим для Docker
  output: 'standalone',
  compiler: {
    // Управление console.log в production
    removeConsole: false,
  },
  experimental: {
    // Отключаем оптимизацию CSS которая может ломать стили
    optimizeCss: false,
    // Включаем правильную обработку статических файлов
    outputFileTracingRoot: process.cwd(),
    logging: {
      level: 'verbose',
      fetches: {
        fullUrl: true,
      },
    },
  },

  productionBrowserSourceMaps: true,

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
      {
        source: '/_next/static/css/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
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
