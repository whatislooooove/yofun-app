# Используем официальный Node.js образ как базовый
FROM node:18-alpine AS base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY src/frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install
RUN npm ci --only=production && npm cache clean --force

# Копируем исходный код
COPY src/frontend/ .

# Собираем приложение для продакшена
RUN npm run build

# Создаем финальный образ
FROM node:18-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Копируем необходимые файлы из предыдущего этапа
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

# Устанавливаем права доступа
RUN chown -R nextjs:nodejs /app
USER nextjs

# Открываем порт
EXPOSE 3000

# Устанавливаем переменные окружения
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]
