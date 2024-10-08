FROM richarvey/nginx-php-fpm:2.1.2
RUN apk add -U --no-cache nghttp2-dev nodejs npm unzip tzdata
COPY . /var/www/html

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

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV NODEJS_ALLOW_SUPERUSER 1
ENV NPM_ALLOW_SUPERUSER 1
ENV YARN_ALLOW_SUPERUSER 1
ENV NPX_ALLOW_SUPERUSER 1
RUN chmod 777 ./*
RUN npm install workbox-window --save && \
composer install  && npm run build

#RUN php artisan db:wipe --drop-types --force 
#RUN php artisan migrate:install
#RUN php artisan migrate --force
#RUN php artisan db:seed --force
EXPOSE 80 81
#CMD ["php artisan","serve -p 80"]
