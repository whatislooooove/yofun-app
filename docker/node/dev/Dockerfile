# Dockerfile для разработки
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Установка зависимостей для разработки
COPY ./src/frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Копирование исходного кода
COPY ./src/frontend ./app

# Переменные окружения
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Порт для разработки
EXPOSE 3000

# Запуск в режиме разработки
CMD ["npm", "run", "dev"]