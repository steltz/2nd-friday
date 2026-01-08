# Implementation Plan: Mobile-Only Home Page

**Branch**: `001-mobile-home` | **Date**: 2026-01-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-mobile-home/spec.md`

## Summary

Build a mobile-only home page that displays placeholder content on mobile devices (viewport ≤480px) and shows an "unavailable" message on larger screens. The implementation uses Tailwind CSS responsive utilities for viewport detection with real-time responsiveness to resize events.

## Technical Context

**Language/Version**: TypeScript 5+ with React 18+
**Primary Dependencies**: React, Tailwind CSS, shadcn/ui (Radix UI primitives)
**Storage**: N/A (no data persistence for this feature)
**Testing**: Vitest + React Testing Library
**Target Platform**: Mobile web browsers (viewport ≤480px), with graceful desktop fallback
**Project Type**: Web application (frontend only, Feature-Sliced Design)
**Performance Goals**: <2s initial load on mobile, <100ms view transition on resize
**Constraints**: No horizontal scroll on mobile, Lighthouse Performance >80
**Scale/Scope**: Single page (home), foundation for future mobile-only app

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Feature-Sliced Design | ✅ Pass | Home page in `pages/home/`, shared UI in `shared/ui/` |
| II. TypeScript Strictness | ✅ Pass | All components will be strictly typed |
| III. Firebase Best Practices | ✅ N/A | No Firebase interactions in this feature |
| IV. Component & State Management | ✅ Pass | Simple viewport state, colocated in hook |
| V. Test-First Development | ✅ Pass | Integration tests for viewport behavior |

**shadcn/ui Compliance**:
- Will use Tailwind CSS responsive classes (already included with shadcn/ui setup)
- No additional shadcn/ui components needed for MVP placeholder content

## Project Structure

### Documentation (this feature)

```text
specs/001-mobile-home/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (minimal - no entities)
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output (empty - no API)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── App.tsx              # Root component with viewport detection
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── pages/
│   └── home/
│       ├── ui/
│       │   └── HomePage.tsx # Mobile home page content
│       └── index.ts         # Public API
├── widgets/
│   └── device-gate/
│       ├── ui/
│       │   └── DeviceGate.tsx    # Viewport-based content switcher
│       ├── lib/
│       │   └── useViewport.ts    # Viewport detection hook
│       └── index.ts              # Public API
└── shared/
    └── ui/
        └── UnavailableScreen.tsx # Desktop fallback message
```

**Structure Decision**: Feature-Sliced Design with `pages` for route-level components, `widgets` for the reusable device gate, and `shared` for the unavailable screen component. This follows FSD layer hierarchy (pages → widgets → shared).

## Complexity Tracking

> No Constitution violations requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | — | — |
