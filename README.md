[![Build Status](https://travis-ci.com/piotrbartnik/solitaire95.svg?branch=master)](https://travis-ci.com/piotrbartnik/solitaire95)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://solitaire95-4b3b8.web.app/)
[![codecov](https://codecov.io/gh/piotrbartnik/solitaire95/branch/master/graph/badge.svg?token=6I29VMDVU6)](https://codecov.io/gh/piotrbartnik/solitaire95)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Windows 95 Solitaire

Implementation of classic Windows 95 Solitaire game using React + Typescript

Repository is structured as a monorepo.
Solitaire game component with all of the logic and code is in `components/solitaire95` directory.

There are two example apps that are using `solitaire95` package and provided by it component `<Solitaire95 />`. Electron + react app and react web app.
Both of them in `application` directory.

Work in progress.

## Installation

- clone repo
- run `yarn install` to install packages. That command will run `lerna bootstrap` so in case of problems check `lerna` package on your machine
- run `yarn start:web` to run web app
- run `yarn start:desktop` to run electron app

Haven't tried to run with `npm` so there might be problems. `yarn` preffered.

## Demo web app

[![](https://i.imgur.com/ftgjWx8.png)](https://solitaire95-4b3b8.web.app/)

## Development

There is still a lot of work in progress. Final app should be as close to original app as possible.

## License

Project created for educational purposes only.
