# ShipFast Project Guidelines

## Project Overview

ShipFast is a modern web application built as a monorepo using the shadcn/ui template. It's designed as a SaaS platform for generating OG (Open Graph) images, featuring both a landing page and a main application with authentication.

### Key Features
- **Landing Page**: Built with Astro for optimal performance and SEO
- **Main Application**: Next.js 15 app with authentication via NextAuth
- **Shared UI Components**: Centralized component library using shadcn/ui
- **Authentication**: OAuth providers (GitHub, Google) with Prisma database integration
- **Modern Stack**: TypeScript, React 19, Tailwind CSS, and Turbo for monorepo management

## Project Structure

```
shipfast/
├── apps/
│   ├── app/           # Next.js main application
│   │   ├── src/
│   │   │   ├── app/   # App Router structure
│   │   │   ├── auth/  # NextAuth configuration
│   │   │   └── prisma/ # Database schema
│   │   └── package.json
│   └── landing/       # Astro landing page
│       ├── src/
│       │   └── components/
│       └── package.json
├── packages/
│   ├── ui/            # Shared shadcn/ui components
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── package.json       # Root package.json with Turbo scripts
└── turbo.json        # Turbo configuration
```

## Development Workflow

### Package Manager
- **Primary**: pnpm (version 10.4.1+)
- **Node Version**: 20+
- **Workspace**: Uses pnpm workspaces for monorepo management

### Available Scripts
- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications for production
- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code using Prettier

### Individual App Commands
- **Main App**: `cd apps/app && pnpm dev` (runs on https://localhost:3000)
- **Landing**: `cd apps/landing && pnpm dev` (runs on http://localhost:4321)

## Testing Guidelines

### Current Testing Status
- No explicit test framework is currently configured
- **Recommendation**: Before implementing new features, consider adding:
  - Jest/Vitest for unit testing
  - Playwright/Cypress for E2E testing
  - React Testing Library for component testing

### Testing Approach
- Run type checking: `pnpm typecheck` (in individual apps)
- Lint checking: `pnpm lint` (at root or app level)
- Manual testing should be performed for authentication flows

## Build Process

### Development Build
```bash
pnpm dev  # Starts all apps in development mode
```

### Production Build
```bash
pnpm build  # Builds all applications
```

### Build Verification
- Always run `pnpm build` before submitting changes
- Ensure both apps build successfully
- Check for TypeScript errors during build

## Code Style Guidelines

### TypeScript
- Strict TypeScript configuration is enforced
- Use proper typing for all components and functions
- Avoid `any` types - use proper interfaces and types

### React/Next.js Patterns
- Use App Router structure (not Pages Router)
- Implement Server Components where appropriate
- Use "use client" directive only when necessary
- Follow Next.js 15 best practices

### Component Structure
- Import shared components from `@workspace/ui`
- Use consistent naming conventions (PascalCase for components)
- Implement proper prop typing with TypeScript interfaces

### Styling
- Use Tailwind CSS for styling
- Follow shadcn/ui design system patterns
- Use CSS variables for theming
- Implement responsive design with Tailwind breakpoints

### Authentication
- Use NextAuth 5.0 beta patterns
- Implement proper session handling
- Follow OAuth provider integration patterns
- Use Prisma for database operations

## Environment Configuration

### Required Environment Variables
- **App**: Check `apps/app/example.env` for required variables
- **Landing**: Uses `PUBLIC_*` variables for Astro

### Database
- Uses Prisma with PostgreSQL
- Schema located at `apps/app/src/prisma/schema-postgres.prisma`
- Run migrations before testing database-related changes

## Submission Checklist

Before submitting changes:
1. ✅ Run `pnpm build` to ensure all apps build successfully
2. ✅ Run `pnpm lint` to check for linting errors
3. ✅ Run `pnpm typecheck` in affected apps
4. ✅ Test authentication flows if auth-related changes were made
5. ✅ Verify responsive design on different screen sizes
6. ✅ Check that shared components work across both apps
7. ✅ Ensure environment variables are properly configured

## Common Patterns

### Adding New Components
```bash
# Add to shared UI package
pnpm dlx shadcn@latest add [component-name] -c packages/ui

# Use in apps
import { ComponentName } from "@workspace/ui/components/component-name"
```

### Database Changes
```bash
cd apps/app
pnpm prisma generate  # After schema changes
pnpm prisma db push   # Push changes to database
```

### Workspace Dependencies
- Use `workspace:*` for internal package dependencies
- Keep external dependencies in sync across apps where possible
