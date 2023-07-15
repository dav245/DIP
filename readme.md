# Thesis

This thesis should compare different approaches to reactivity, DOM syncing and component design of three selected frameworks. [Vue 3](https://vuejs.org/), [SolidJS](https://www.solidjs.com/), [Svelte](https://svelte.dev/).

## Contents of repository

- Backend - contains server written on top of [Laravel 9](https://laravel.com/). It is simple messaging app
- CommonFrontend - folder, that is accessible from all frontends
- Vue - Frontend written in vue
- Svelte - Frontend written in svelte
- Solidjs - Frontend written in solidjs

## What you need to get started

- php 8.1 installed and available on $PATH
- composer 2
- mariadb 10.6.7
- node 18.4.0 with npm 8.12.1

## How to get started

First you need to start backend server. Go to backend folder and copy .env.example to .env.
In .env file fill in `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`.
Run `composer install`, then `php artisan key:generate && php artisan migrate:fresh --seed` and finally to start
server run `php artisan serve`

Now we have backend running. Go to root folder and copy .env.example to .env
To start some frontend go to specific folder of that frontend eg. vue. From there run `npm i` and to start project
`npm run dev` Now we have to servers running on two ports. Backend should be on localhost:8080 and frontend localhost:5810 or something similar. Go to localhost:5810 or your specific host and application should be running.
Try registering new user to see if everything works as expected
