<h1 align="center">Welcome to node-hotel-scraper 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D9.3.0-blue.svg" />
  <a href="https://github.com/kefranabg/readme-md-generator/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/tiobri/node-hotel-scraper" />
  </a>
</p>

> Web-Scraper that search vacancies in a hotel website and returns it to an API.

## Prerequisites

- npm >=5.5.0
- node >=9.3.0

## Install

```sh
npm install
```

## Configuration

```sh
cp .env.example .env
```

## Usage

```sh
npm run start
```

The application will work on port 3000. If you want to use other port change variable PORT inside .env file.

## Request Example

```sh
curl -d "checkin="19/10/2020"&checkout="21/10/2020"" -X POST http://localhost:3000/search
```

## Author

👤 **Fabrício Pedroso Nunes**

* GitHub: [@tiobri](https://github.com/tiobri)
* LinkedIn: [@fabriciopedrosonunes](https://linkedin.com/in/fabriciopedrosonunes)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
