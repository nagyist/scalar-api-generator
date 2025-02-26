# Scalar Development Commands & Conventions

## Common Commands
- Build: `pnpm turbo build`
- Test: `pnpm test` (filter specific tests: `pnpm test [testname]`)
- Lint: `pnpm lint:check` (fix: `pnpm lint:fix`)
- Format: `pnpm format` (check: `pnpm format:check`)
- Type check: `pnpm types:check`
- Dev environments: `pnpm dev:client`, `pnpm dev:reference`, `pnpm dev:web`

## Code Style Guidelines
- Use spaces (2 spaces indentation)
- Prefer single quotes for strings
- Use semicolons only as needed (asNeeded)
- Use trailing commas in objects and arrays
- Strict typing with TypeScript
- Arrow functions preferred over function declarations
- Prefer const over let, no var
- Use optional chaining and nullish coalescing
- Line width: 120 characters
- Use ESM imports/exports
- Naming: camelCase for variables/functions, PascalCase for classes/interfaces
- Import sorting: relative imports after absolute imports

## Error Handling
- Use try/catch for async functions
- Avoid throwing generic errors
- Provide detailed error messages