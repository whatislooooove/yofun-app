# Инструкция по локальному развертыванию

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/whatislooooove/yofun-app.git
   cd yofun-app
   ```

2. **Запустите контейнеры в режиме разработки**
   ```bash
    docker compose -f docker-compose.dev.yml up -d 
   ```
3. **Настройте env-файлы в соответствии с примерами (отдельно для backend и для frontend)**


4. **Выполните artisan-команды**

```bash
  # Устанавливаем миграции, генерим ключ шифрования и открываем доступ на просмотр статических файлов
  docker compose -f docker-compose.prod.yml php artisan migrate
  docker compose -f docker-compose.prod.yml php artisan key:generate
  docker compose -f docker-compose.prod.yml php artisan moonshine:install
  docker compose -f docker-compose.prod.yml php artisan storage:link
  docker compose -f docker-compose.prod.yml php artisan sources:init
 
```

5. **Готово. Проект должен открываться на localhost или на 127.0.0.1**


## TODO: 
1. 1. [ ] Объединить env-файлы фронта и бэка в 1
