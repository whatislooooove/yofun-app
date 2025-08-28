# Инструкция по production-развертыванию

Перед локальным развертыванием обязательно нужно иметь рабочую локальную версию, так как env-файл для прода
необходимо залить сразу готовый. Возможно это неправильно (например, ключ приложения, который генерируется
через php artisan key:generate - для прода не будет генерироваться отдельно), но как сделать правильно - 
пока не додумал. Нужно больше углубиться в CI CD процессы, чтобы понять эти нюансы.

1. Подготавливаем сервер для установки проекта
 ```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx -y
sudo apt install git -y
```
Также ставим докер согласно инструкции из [официального сайта](https://docs.docker.com/engine/install/ubuntu/#installation-methods)

2. Клонируем репозиторий с [инфраструктурой](https://github.com/whatislooooove/yofun-infrastructure). 
3. Настраиваем env файл, а именно: соединяем в 1 файл переменные backend-части приложения и frontend-части
   (согласно env.example)
4. Готово, можно вручную подтянуть образы и запустить:
```bash
  # Ручной заруск контейнеров
  docker compose -f docker-compose.prod.yml pull
  docker compose -f docker-compose.prod.yml up -d
```
5. Теперь, если проект запускается впервые, необходимо выполнить artisan-команды
```bash
  # Устанавливаем миграции, генерим ключ шифрования и открываем доступ на просмотр статических файлов
  docker compose -f docker-compose.prod.yml php artisan migrate
  docker compose -f docker-compose.prod.yml php artisan key:generate
  docker compose -f docker-compose.prod.yml php artisan moonshine:install
  docker compose -f docker-compose.prod.yml php artisan storage:link
  docker compose -f docker-compose.prod.yml php artisan sources:init
 
```
P.S. Этот момент нужно как то автоматизировать на уровне CI CD. На крайняк, можно написать bash-скрипт
для первичной установки проекта

CI/CD на Github Actions настроены на автоматическую сборку и деплой контейнеров при каждом пуше нового коммита
в мастер, поэтому для обновления прода все что необходимо сделать - сделать пуш в мастер.