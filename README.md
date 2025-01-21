# Next.js Project Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Cloning the Template

1. Clone this repository and give it your app name:
```bash
git clone https://github.com/your-username/next-boilerplate.git your-app-name
cd your-app-name
```

2. Remove the existing git remote:
```bash
git remote remove origin
```

3. Add your new repository as the origin:
```bash
git remote add origin https://github.com/your-username/your-app-name.git
```

4. Push to your new repository:
```bash
git push -u origin main
```

### Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

The project follows a modular architecture designed for scalability and maintainability:

```
src
├── common
├── components
├── features
├── hooks
└── lib
```

### common Folder

Contains shared utilities, constants, types, and providers used across the application:

```
common
├── app-routes.ts
├── assets.ts
├── components
├── constants.ts
├── csrf-utils.ts
├── environment.ts
├── hooks.ts
├── providers
├── types.ts
└── utils.ts
```

### components Folder

Houses reusable UI components shared across features:

```
components
└── ui
    ├── accordion.tsx
    ├── alert-dialog.tsx
    ├── button.tsx
    ├── card.tsx
    // ... other UI components
```

### features Folder

Feature-specific code organized by functionality:

```
features
├── browse
│   └── components
├── business
│   └── hooks.ts
└── business-product
    ├── components
    ├── hooks.ts
    └── stores.ts
```

### hooks Folder

Custom hooks for reusable logic:

```
hooks
├── use-mobile.tsx
└── use-toast.ts
```

### lib Folder

Backend-oriented utilities and services organized in a clean architecture pattern:

```
lib
├── adapters
│   └── trpc
│       └── routers        # tRPC route handlers
├── core
│   └── controllers        # Business logic controllers
├── env                    # Environment configuration
├── extern
│   ├── db                # Database configuration and schemas
│   └── repositories      # External service implementations
└── trpc                  # tRPC setup and utilities
```

#### Key Architecture Components:

1. **tRPC Setup**
   - Uses `createTRPCReact` for type-safe API calls
   - Server-side rendering support with React Server Components
   - Automatic request batching via `httpBatchLink`
   - Superjson for enhanced serialization

2. **Database Integration**
   - Drizzle ORM with PostgreSQL
   - Type-safe schema definitions
   - Environment-based configuration

3. **Clean Architecture**
   - Controllers handle business logic
   - Repositories manage external data access
   - Clear separation of concerns via adapters

### Environment Setup

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Key Conventions

1. Keep folders shallow: Maximum two levels deep unless necessary
2. Feature isolation: Group related components, hooks, and stores within features
3. Shared functionality: Place reusable code in common
4. Type safety: Use tRPC for end-to-end type safety
5. Server Components: Prefer React Server Components for data fetching
6. Error Handling: Use Zod for validation and tRPC error handling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
