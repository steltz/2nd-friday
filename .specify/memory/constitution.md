<!--
  Sync Impact Report
  ==================
  Version change: 1.0.1 → 1.0.2 (PATCH - Resolved styling placeholder with shadcn/ui)

  Modified principles: None

  Added sections: None

  Removed sections: None

  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ (no changes needed)
    - .specify/templates/spec-template.md ✅ (no changes needed)
    - .specify/templates/tasks-template.md ✅ (no changes needed)

  Follow-up TODOs: None
-->

# 2nd-Friday Constitution

## Core Principles

### I. Feature-Sliced Design Architecture

All source code MUST follow the Feature-Sliced Design (FSD) methodology:

- **Layer hierarchy**: `app` → `processes` → `pages` → `widgets` → `features` → `entities` → `shared`
- **Public API rule**: Each slice MUST expose functionality only through its `index.ts` barrel export
- **Import direction**: Layers can only import from layers below them (e.g., `features` can import from `entities` and `shared`, never from `pages` or `widgets`)
- **Slice isolation**: Slices within the same layer MUST NOT import from each other directly
- **Segment structure**: Each slice SHOULD contain `ui/`, `model/`, `api/`, and `lib/` segments as needed

**Rationale**: FSD provides predictable, scalable architecture that prevents spaghetti dependencies and makes features genuinely portable.

### II. TypeScript Strictness

All TypeScript code MUST adhere to strict type safety:

- `strict: true` MUST be enabled in `tsconfig.json`
- `any` type is PROHIBITED except in rare, documented escape hatches
- All function parameters and return types MUST be explicitly typed
- Prefer `unknown` over `any` when type is genuinely uncertain
- Use discriminated unions for complex state modeling
- Generic types SHOULD be used to maximize code reuse without sacrificing type safety

**Rationale**: Strict typing catches bugs at compile time, improves IDE support, and serves as living documentation.

### III. Firebase Best Practices

All Firebase interactions MUST follow these rules:

- **Security Rules First**: Firestore/RTDB security rules MUST be defined before implementing client-side data access
- **Production Development**: Development connects directly to production Firebase; use caution with destructive operations
- **Typed Collections**: All Firestore collections MUST have TypeScript interfaces with converters
- **Error Boundaries**: Firebase operations MUST include proper error handling; network failures are expected
- **Cost Awareness**: Queries MUST be designed with read/write costs in mind; avoid unbounded listeners

**Rationale**: Firebase's flexibility makes it easy to create security holes and cost explosions; these guardrails prevent common pitfalls.

### IV. Component & State Management

React components and state MUST follow these patterns:

- **Composition over configuration**: Prefer small, composable components over large configurable ones
- **Colocation**: State SHOULD live as close to where it's used as possible
- **Server state vs. client state**: Use appropriate tools (e.g., React Query/TanStack Query for server state, React Context/Zustand for client state)
- **Props drilling limit**: If props pass through more than 2 intermediate components, consider composition or context
- **Controlled components**: Form inputs SHOULD be controlled; uncontrolled only when performance demands it
- **Hooks extraction**: Custom hooks MUST be used when logic is shared or when component logic exceeds ~50 lines

**Rationale**: Consistent patterns make components predictable, testable, and maintainable across the team.

### V. Test-First Development

Testing follows a pragmatic test-first approach:

- **Critical paths first**: User-facing flows and business logic MUST have integration tests
- **Component testing**: Shared UI components MUST have unit tests for their public API
- **Mocking Firebase**: Tests MUST mock Firebase services; never hit real Firebase in tests
- **Testing Library conventions**: Use `@testing-library/react`; query by accessible roles, not implementation details
- **Test file colocation**: Test files SHOULD live adjacent to the code they test (e.g., `Button.test.tsx` next to `Button.tsx`)

**Rationale**: Pragmatic testing balances confidence with development velocity; test what matters, not vanity metrics.

## Technology Stack

**Runtime**: Node.js 20+ (LTS)
**Build Tool**: Vite 5+
**Framework**: React 18+ with TypeScript 5+
**Backend Services**: Firebase (Auth, Firestore, Storage, Functions as needed)
**Design System**: shadcn/ui with Tailwind CSS and Radix UI primitives
**Testing**: Vitest + React Testing Library
**Package Manager**: npm or pnpm (team choice, but MUST be consistent)

**shadcn/ui Guidelines**:
- Components MUST be added via `npx shadcn@latest add <component>` to `src/shared/ui/`
- Customizations SHOULD be made in the copied component files, not external overrides
- Tailwind theme configuration lives in `tailwind.config.ts`; use CSS variables for theming
- Prefer shadcn/ui components over custom implementations; extend only when necessary

**Constraints**:
- Bundle size: Initial load SHOULD be < 200KB gzipped (excluding Firebase SDK)
- Lighthouse Performance score MUST be > 80 for production builds
- All dependencies MUST be audited for security vulnerabilities before adoption

## Development Workflow

**Branch Strategy**:
- `main` is protected; all changes via pull request
- Feature branches: `feature/[description]` or `[issue-number]-[description]`
- Commits MUST use semantic commit messages

**Code Quality Gates**:
- TypeScript compilation MUST pass with zero errors
- ESLint MUST pass with zero errors (warnings acceptable during development)
- All tests MUST pass before merge
- PRs SHOULD be reviewed by at least one other developer

**Environment Management**:
- Environment variables MUST NOT be committed; use `.env.local` (gitignored)
- Firebase config MUST be loaded from environment variables, not hardcoded
- Sensitive keys MUST NEVER appear in client-side code

## Governance

This constitution is the authoritative source for architectural decisions and development standards for the 2nd-Friday project.

**Amendment Process**:
1. Propose changes via pull request to this file
2. Document rationale for the change
3. Changes require team review and approval
4. Update `LAST_AMENDED_DATE` and increment version appropriately

**Version Policy**:
- MAJOR: Backward-incompatible changes (removing principles, fundamental shifts)
- MINOR: New principles added or significant expansions
- PATCH: Clarifications, typo fixes, non-breaking refinements

**Compliance**:
- All PRs MUST pass the Constitution Check in `plan-template.md`
- Violations MUST be documented in the Complexity Tracking table with justification
- Runtime development guidance is available in project documentation

**Version**: 1.0.2 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-08
