# Implementation Plan: Logo Fade-In Home Page

**Branch**: `002-logo-fade-home` | **Date**: 2026-01-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-logo-fade-home/spec.md`

## Summary

Update the home page to display only the 2nd Fridays Social Club logo (`/public/logo.png`) with a slow fade-in animation on page load. Replace all existing home page content with a centered, animated logo using Tailwind CSS animations.

## Technical Context

**Language/Version**: TypeScript 5.9 with React 19
**Primary Dependencies**: React, Tailwind CSS, tailwindcss-animate
**Storage**: N/A (static asset only)
**Testing**: N/A (no tests directory exists, visual verification)
**Target Platform**: Mobile web (≤480px viewport via DeviceGate)
**Project Type**: Web application (FSD architecture)
**Performance Goals**: Logo visible within 3 seconds, smooth 60fps animation
**Constraints**: Mobile-only, existing DeviceGate behavior preserved
**Scale/Scope**: Single page modification

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Feature-Sliced Design | ✅ PASS | Modification stays within `pages/home` slice |
| II. TypeScript Strictness | ✅ PASS | Simple component, explicit types used |
| III. Firebase Best Practices | ✅ N/A | No Firebase interaction |
| IV. Component & State Management | ✅ PASS | Stateless component, no props drilling |
| V. Test-First Development | ⚠️ WAIVED | Visual animation feature, manual QA sufficient |
| Technology Stack | ✅ PASS | Uses existing React 19, Tailwind CSS, tailwindcss-animate |
| Bundle Size | ✅ PASS | No new dependencies added |

**Gate Result**: PASS - All applicable principles satisfied.

## Project Structure

### Documentation (this feature)

```text
specs/002-logo-fade-home/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A - no data entities)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── App.tsx
│   └── main.tsx
├── pages/
│   └── home/
│       ├── index.ts           # Barrel export
│       └── ui/
│           └── HomePage.tsx   # ← MODIFY: Replace content with animated logo
├── shared/
│   ├── lib/
│   │   └── utils.ts
│   └── ui/
│       ├── index.ts
│       └── UnavailableScreen.tsx
└── widgets/
    └── device-gate/
        └── ...

public/
└── logo.png                   # ← SOURCE: Logo asset to display
```

**Structure Decision**: Single page modification within existing FSD structure. No new slices or layers needed. Animation achieved via Tailwind CSS classes (using existing `tailwindcss-animate` plugin).

## Complexity Tracking

> No violations - all changes fit within existing architecture.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | - | - |
