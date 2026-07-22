# FORMA

A demo fashion e-commerce website for the premium brand FORMA. The project includes a product catalog, product pages, color and size variants, favorites, a shopping cart, a demo checkout, a lookbook, collections, and separate contact pages in English and Ukrainian.

> This project is a demonstration concept. No real payments are accepted.

## Running locally

Node.js 20.9 or later is required.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation and production build

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Main routes

* `/` — homepage
* `/shop` — product catalog
* `/product/[id]` — product page
* `/lookbook` — editorial lookbook
* `/collections` — collections
* `/cart` — shopping cart
* `/checkout` — demo checkout
* `/contact/en` — contact page in English
* `/contact/ua` — contact page in Ukrainian

## Data and state

The product catalog is stored locally. The shopping cart, favorites, and selected language are persisted in `localStorage`. No server, database, authentication, or payment SDKs are used.

All optimized website images are stored in `public/images`, and their purpose is documented in `public/images/products/manifest.json`.

## Deployment

The repository can be imported into Vercel or deployed to any platform that supports Node.js. Build command: `npm run build`; start command: `npm run start`.

Team contact: [igorcorp.tech@gmail.com](mailto:igorcorp.tech@gmail.com)
