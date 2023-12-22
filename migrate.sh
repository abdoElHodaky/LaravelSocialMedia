#/usr/bin/bash

php artisan clear-compiled
#php artisan db:wipe --drop-types --force
php artisan migrate:refresh --force
php artisan db:seed --force
