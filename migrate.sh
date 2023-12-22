#/usr/bin/bash
composer install

php artisan clear-compiled
php artisan db:wipe --drop-types --force
php artisan migrate --force
php artisan db:seed --force
