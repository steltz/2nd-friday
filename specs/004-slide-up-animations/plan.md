# Implementation Plan: Slide-Up Animation System

**Branch**: `004-slide-up-animations` | **Date**: 2026-01-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-slide-up-animations/spec.md`

## Summary

Replace all home page animations with a unified slide-up animation pattern. Elements enter from the bottom of the viewport and exit through the top, creating a consistent vertical flow. This affects the logo sequence animation and stepper form entry animations.

## Technical Context

**Language/Version**: TypeScript 5.9 with React 19
**Primary Dependencies**: React, Tailwind CSS, tailwindcss-animate, shadcn/ui (Radix UI primitives)
**Storage**: N/A (client-side animations only)
**Testing**: N/A (visual animations - manual verification)
**Target Platform**: Web (mobile-first, responsive)
**Project Type**: Web application (frontend only)
**Performance Goals**: 60fps animations, no jank or dropped frames
**Constraints**: Animations must not block interactivity, respect prefers-reduced-motion
**Scale/Scope**: Single page (HomePage), 3 animated elements (logo, stepper form, completion screen)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Feature-Sliced Design | PASS | Animations defined in Tailwind config (shared layer), used in pages/widgets |
| II. TypeScript Strictness | PASS | No new types required; existing strict mode maintained |
| III. Firebase Best Practices | N/A | No Firebase interactions in this feature |
| IV. Component & State Management | PASS | Animation state managed via CSS classes, minimal React state |
| V. Test-First Development | PASS | Visual animations exempt from automated tests per constitution |
| Technology Stack | PASS | Uses existing Tailwind CSS + tailwindcss-animate |
| Code Quality Gates | PASS | Must pass TypeScript compilation and ESLint |

**Gate Status**: PASS - All applicable principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/004-slide-up-animations/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
src/
├── app/
│   └── index.css              # CSS variables (no changes needed)
├── pages/
│   └── home/
│       └── ui/
│           └── HomePage.tsx   # MODIFY: Update logo animation class
├── widgets/
│   └── stepper-form/
│       └── ui/
│           └── StepperForm.tsx # VERIFY: Uses slide-up-enter (already correct)
└── shared/
    └── ui/                    # No changes needed

tailwind.config.ts             # MODIFY: Update keyframes and animations
```

**Structure Decision**: Single web application following Feature-Sliced Design. Animation definitions live in Tailwind config (shared configuration), consumed by page and widget components.

## Complexity Tracking

> No violations - feature follows existing patterns

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Architecture Decision

### Animation Strategy

**Chosen Approach**: CSS Keyframe Animations via Tailwind

- Define keyframes in `tailwind.config.ts` for:
  - `slide-up-enter`: Start at `translateY(100vh)`, end at `translateY(0)`
  - `slide-up-exit`: Start at `translateY(0)`, end at `translateY(-100vh)`
  - `logo-sequence`: Combined enter → pause → exit sequence

**Rationale**:
- Leverages existing Tailwind infrastructure
- CSS animations are GPU-accelerated (transforms)
- No JavaScript animation library needed
- Consistent with current implementation pattern

### Animation Timing

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Logo Entry | slide-up-enter | 600ms | ease-out |
| Logo Hold | none (static) | 400ms | - |
| Logo Exit | slide-up-exit | 600ms | ease-in |
| Stepper Form Entry | slide-up-enter | 400ms | ease-out |
| Completion Screen Entry | slide-up-enter | 400ms | ease-out |

### Accessibility

- Respect `prefers-reduced-motion` media query
- When reduced motion: instant appearance (opacity only, no transforms)
- No seizure-inducing rapid animations

## Files to Modify

1. **tailwind.config.ts** - Update keyframes:
   - Remove horizontal shake from `logo-sequence`
   - Add pure vertical slide pattern for logo
   - Verify `slide-up-enter` keyframe exists (it does)

2. **src/pages/home/ui/HomePage.tsx** - Update logo animation:
   - Change `animate-fade-in` class reference
   - Ensure `onAnimationEnd` fires correctly with new animation

3. **No changes needed** to:
   - StepperForm.tsx (already uses `animate-slide-up-enter`)
   - CSS files (Tailwind handles everything)

## Phases Summary

- **Phase 0**: Research complete - no unknowns, using existing Tailwind patterns
- **Phase 1**: Update animation keyframes and apply to components
- **Phase 2**: Tasks will be generated by `/speckit.tasks`
