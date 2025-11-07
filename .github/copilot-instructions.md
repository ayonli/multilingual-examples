# TypeScript/JavaScript Coding Instructions

**Variables** 

- Use `const` and `let` when possible and prefer const, never use `var`
- Try to use shorter variable names for small scopes, e.g., loop indices,
  conditional or loop blocks, etc.
- When using Drizzle ORM, define table fields with snake_case to match database
  naming conventions

**Functions**

- Top level functions must be declared with `function` keyword
- Functions should have explicit return types
- Function should not have more than 4 parameters, consider using an options
  object if more are needed
- Function signatures should not take object literal types, always declare proper
  interfaces or types for object parameters, and export them if the function is
  exported; these type declarations should be colocated with the function
- Keep function bodies small and focused, consider breaking down large functions
  into smaller helper functions, but avoid over-modularization and keep related
  logic together, also keep helper functions close to their callers

**Types**

- Prefer using `interface` for object shapes, use `type` for unions, intersections,
  and utility types
- Avoid using `any` type, prefer more specific types or `unknown` if necessary
- Prefer type inference over explicit types when obvious
- Prefer using **zod** to define DTOs and infer types from zod schemas, the
  schema and inferred type should be the same name and capitalized; the name
  shall not have suffixes like `Schema`, `Model`, `Type` or `Dto`, just a pure
  type name, e.g., `User`, `CreateUserData`, etc.
- Prefer using generic types for function parameters instead of super-classes or
  interfaces, the generic type should have bound constraints when necessary
- Define extended error classes instead of using plain `Error` for better error
  handling and identification

**Modules**

- Exported module members should have explicit types
- Prefer static imports, only use dynamic imports to load modules conditionally
  or avoid circular dependencies
- Prefer named exports over default exports
- Use `import type` for type-only imports
- Add `.ts` extension (or `.js` for JS files) for importing relative modules
- Always `import process from "node:process"` when using the `process` global,
  the same applies to other Node.js built-in globals
- Try to group imports by built-in modules, external modules, internal modules,
  and relative modules, with a blank line in between and order them
  alphabetically in each group
- Construct modules with top level stateless functions, avoid classes, especially
  singletons when possible
- Group related functions into modules, related modules into a bigger module,
  form a domain-driven structure via modules
- Construct business logic like we're writing libraries, try to avoid framework
  or environment lock-in

**Libraries**

- Prefer using `@ayonli/jsext` for common utility functions
- Prefer using `@ayonli/react-hooks` for common React hooks
- Prefer using Hono for building web servers and APIs
- Prefer using Drizzle ORM for database interactions
- Prefer using Zod for data validation and parsing
- Prefer using React for building user interfaces

**Control Flows**

- Prefer adding curly braces for switch cases
- Prefer using early returns to reduce nesting
- Prefer using ternary operator for simple conditional assignments
- Prefer using a IIFE (Immediately Invoked Function Expression) for initializing
  variables that require complex logic and still use `const`
- `Promise`s must be `await`ed or `.catch`ed to prevent unhandled rejections
- Don't rethrow errors without wrapping or logging them or have some sort of
  handling logic
- Don't throw or return in `finally` blocks
- Use `AbortSignal` to handle cancellations when possible, design APIs to accept
  `AbortSignal` when applicable
- Check exhaustiveness in switch and conditional statements when possible

**Modernization**

- Prefer using built-in methods and language features over external libraries
- Prefer using modern ECMAScript standards and features, avoid host-specific APIs
  when possible
- Prefer using `Uint8Array` over Node.js `Buffer` for binary data
- If targeting Node.js v22+ or Deno, prefer iterator helper methods over array
  counterparts (e.g., `map`, `filter`, `reduce`, etc.)

**Safety**

- Avoid using deprecated or discouraged language features, APIs and libraries
- Prefer using `Array.prototype.at` for safe array indexing
- Prefer regular expression literals over `new RegExp` for both safety and
  performance
- Prefer using optional chaining and nullish coalescing operators for safer property
  access and default values
- Always try to write safe and secure code, learn and practice secure coding
  from Rust and other memory-safe languages

**Workflows**

- Ask for clarification when requirements are ambiguous or incomplete
- Write unit tests for critical and complex logic, but first try to break down
  complex logic into smaller, testable functions
- Use `Deno.test` for simple tests if `deno` is available, otherwise use `node:test`;
  use `vitest` for React components and browser-related tests
- Follow the existing code style and conventions in the project, however override
  them with these instructions if existing code doesn't follow them
- Gradually refactor and modernize legacy code when touching them for other
  changes
- Look for scripts or commands to format, lint and type-check changed files after
  done editing, if not found, try these commands:
  - `deno lint --fix <file>`
  - `deno fmt <file>`
  - `tsc --noEmit`
- Write meaningful but brief commit messages that describe the changes made
