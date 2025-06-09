FROM php:8.4-fpm-alpine3.21

RUN apk add --no-cache \
        libstdc++ \
        libgcc \
        sqlite-dev \
        postgresql17-dev \
        --update \
        nodejs \
        npm \
        && docker-php-ext-install pdo pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www
COPY ./src/backend .
RUN composer install

RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage \
    && chmod -R 775 /var/www/bootstrap/cache

CMD ["php-fpm"]
