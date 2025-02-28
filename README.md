# Next.js Scaffolding

This is a Next.js scaffolding project that includes various tools and configurations for frontend development with Next.js, React, TypeScript, TailwindCSS, and Storybook.

## Features
- **Next.js 15** for server-side rendering and static site generation.
- **React 19** for building interactive user interfaces.
- **TypeScript** for static typing and improved developer experience.
- **TailwindCSS** for utility-first CSS styling.
- **Storybook** for UI component development and testing.
- **ESLint & Prettier** for code linting and formatting.
- **Jest & Testing Library** for unit and integration testing.
- **Husky** for Git hooks to enforce best practices.
- **Zustand** for state management.
- **Prisma** as the ORM for database interactions.
- **Next-Auth** for authentication management.
- **Axios** for API requests.
- **Concurrent script execution** for optimized development workflows.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 18)
- pnpm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd next-scaffolding
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```

### Development
To start the development server:
```sh
pnpm run dev
```
This runs the Next.js development server at `http://localhost:3000/`.

### Building the Project
To build the application:
```sh
pnpm run build
```
This will generate an optimized production build.

### Running Storybook
To start Storybook for UI component development:
```sh
pnpm run storybook
```
Storybook will run on `http://localhost:6006/`.

### Testing
To run tests:
```sh
pnpm run test
```
To run tests in watch mode:
```sh
pnpm run test:watch
```
To check test coverage:
```sh
pnpm run test:coverage
```

### Prisma
To generate Prisma client:
```sh
pnpm run prisma:generate
```
To open Prisma Studio:
```sh
pnpm run prisma:studio
```

### Linting & Formatting
To lint code:
```sh
pnpm run lint
```
To format code:
```sh
pnpm run format
```

### Husky
Husky is installed to manage pre-commit hooks. To set it up:
```sh
pnpm run prepare
```

## License
This project is licensed under the MIT License.

## Author
[Your Name]

