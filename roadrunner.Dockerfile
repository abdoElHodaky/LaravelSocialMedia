FROM spacetabio/roadrunner-alpine:8.0-base-1.11.0
RUN apk add -U --no-cache nghttp2-dev nodejs npm unzip tzdata
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN docker-php-ext-install bcmath 
COPY . /var/www/html
WORKDIR /var/www/html

ENV SKIP_COMPOSER 0
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_KEY base64:B6l/H5fSpR60Y+MpcKP22Z1B4Us7adD+jJrln8XOcpQ=
ENV APP_ENV production
ENV APP_DEBUG true
ENV LOG_CHANNEL stderr
ENV APP_URL 0.0.0.0
ENV ROADRUNNER_PORT 85

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV NODEJS_ALLOW_SUPERUSER 1
ENV NPM_ALLOW_SUPERUSER 1
ENV YARN_ALLOW_SUPERUSER 1
ENV NPX_ALLOW_SUPERUSER 1
ENV OCTANE_SERVER roadrunner

#RUN echo 'pm.max_children = 15' >> /usr/local/etc/php-fpm.d/zz-docker.conf && \
#echo 'pm.max_requests = 500' >> /usr/local/etc/php-fpm.d/zz-docker.conf
RUN chmod -R 777 . && composer install &&\
composer require laravel/octane && npm install workbox-window --save &&\
npm run build 
RUN yes | php artisan octane:install --server=roadrunner
#RUN npm run build && php artisan storage:link
EXPOSE ${ROADRUNNER_PORT} 
CMD ["php artisan octane:start","--workers=4","--server=roadrunner","--port=85"]
