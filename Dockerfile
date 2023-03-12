FROM php:8.1-apache

SHELL ["/bin/bash", "--login", "-c"]
RUN apt-get update && apt upgrade -y && apt install nano

COPY backend /var/www/backend
COPY docker/be.env.local /var/www/backend/.env
COPY docker/backend.conf /etc/apache2/sites-available/backend.conf

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2enmod rewrite && a2enmod headers
RUN a2dissite 000-default
RUN a2ensite backend
RUN chown -R www-data:www-data /var/www/backend/storage
RUN chown -R www-data:www-data /var/www/backend/bootstrap

COPY common /var/www/common

COPY docker/.env.local /var/www/.env.local
copy env.d.ts /var/www/env.d.ts

COPY vue /var/www/vue
COPY docker/vue.conf /etc/apache2/sites-available/vue.conf

RUN a2ensite vue
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
RUN nvm install v18.12.1

WORKDIR /var/www/vue
RUN npm install
RUN npm run build

RUN service apache2 restart

EXPOSE 80
EXPOSE 433