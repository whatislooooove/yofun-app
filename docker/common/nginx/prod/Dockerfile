FROM nginx:alpine3.20

# Копируем nginx конфиги
COPY /docker/common/nginx/conf.d /etc/nginx/conf.d

# Копируем статику из образа backend
COPY --from=backend /var/www/public /var/www/public

EXPOSE 80