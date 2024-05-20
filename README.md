# Moirai.js

<a href="https://moirai-js.vercel.app">

![Frame 111](/banner.png)
</a>

A web and text based implementation of the [moirai](https://hypernexus.itch.io/moirai) game.

## Stack

- Nextjs 14
- Tailwind-css
- Typescript
- Neon serverless Posgresql
- Drizzle

## Getting Started

First, install dependencies using pnpm:

```bash
$ pnpm i
```

### Setup database

We choose Neon DB, but feel free to use whatever you want, see `/src/db/drizzle.ts`

- Copy `.env.example` and rename it to `.env` fill `NEON_DATABASE_URL`.

- Run script `db:push` to sync schemas.

```bash
$ pnpm run db:push
```

### Start dev server

```bash
$ pnpm run dev
```

Now can start editing the page by modifying `app/page.tsx`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
