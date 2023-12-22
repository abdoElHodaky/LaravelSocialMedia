#/usr/bin/bash

php artisan db:wipe --drop-types --force
php artisan migrate --force
php artisan db:seed --force
