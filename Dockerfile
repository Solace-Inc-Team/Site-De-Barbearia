# ---------- 1) assets do front (React, Bootstrap, Swiper, AOS) ----------
FROM node:24-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY vite.config.js ./
COPY resources ./resources
RUN npm run build

# ---------- 2) aplicação Laravel no Apache ----------
FROM php:8.4-apache

# upgrade: a imagem oficial pode ser anterior às correções de segurança do Debian
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite headers

# Configuração de produção do PHP (não mostra avisos nem caminhos na tela)
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Não conta a versão do Apache/Debian no cabeçalho "Server" nem nas páginas de erro
RUN printf '%s\n' 'ServerTokens Prod' 'ServerSignature Off' > /etc/apache2/conf-available/zz-esconder-versao.conf \
    && a2enconf zz-esconder-versao

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
ENV TZ=America/Sao_Paulo
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/000-default.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

COPY . .
COPY --from=assets /app/public/build ./public/build

RUN composer dump-autoload --optimize --no-dev \
    && php artisan package:discover --ansi \
    && mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80

# Cache de config/rotas/views na subida, quando as variáveis de ambiente (APP_KEY, MAIL_*) já existem
CMD ["sh", "-c", "php artisan config:cache && php artisan route:cache && php artisan view:cache && chown -R www-data:www-data storage bootstrap/cache && exec apache2-foreground"]
