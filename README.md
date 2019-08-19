# TronaldTrump

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server (universal)

Run `npm run build:ssr` to build the app for universal. For a universal server run `npm run serve:ssr` after building for ssr. Navigate to `http://localhost:4000/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. (With help of ngrx-schematics, you can also generate `|effect|reducer|action`)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` or `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io). It also will generate code coverage in the folder `/coverage` to see test coverage.

## Running documentation

Run `npm run documentation` to execute the documentation via [Compodoc](https://compodoc.app). It also will generate documentation coverage (and the documentation) in the folder `/documentation`.

## Architecture details

- Used `angular` for universal & spa versions of the app.
- Used `ngrx` for state management (for favorites, user management and meme generation & state handling).
- Used `ngx-device-detector` for detecting if it is mobile or desktop device.
- Used `ngx-hm-carousel` for the carousel.
- There are also lots of details that we can talk face to face.

## Some decisions

- Favorites and my-quotes could be taken to database, but as we talked, my biggest passion is front end, so for being able to show my skills on front end, I handled them on front end.
- But still, also for showing my backend skills, I used Boilerplate as a proxy, handled all quote-related requests on that side.
- Because of time restrictions (because of my holiday in-between) I did not want to write from scratch, but If needed, I can write it from scratch.
- I used device detector for not rendering both views for mobile & desktop.
- I tried to complete all optional, functional, non-functional requirements.
- I tried to make test & documentation coverage 100%
