# Implementation Plan: Stepper Form with Quiz Questions

**Branch**: `003-stepper-form` | **Date**: 2026-01-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-stepper-form/spec.md`

## Summary

Implement an animated stepper form that slides in from the bottom of the screen after the logo animation completes. The form displays 6 questions one at a time (Yes/No, numeric, text, and phone input types) with a progress indicator showing current position. Users can navigate forward after answering each question or back to modify previous answers. Built using React state management, shadcn/ui form components, and Tailwind CSS animations.

## Technical Context

**Language/Version**: TypeScript 5.9 with React 19
**Primary Dependencies**: React, Tailwind CSS, tailwindcss-animate, shadcn/ui (Radix UI primitives)
**Storage**: N/A (client-side state only, no persistence per spec assumptions)
**Testing**: Vitest + React Testing Library (manual QA for animations)
**Target Platform**: Mobile web (≤480px viewport, enforced by DeviceGate)
**Project Type**: Web application (single frontend, no backend)
**Performance Goals**: Animation completes within 300ms (SC-004), form slide-in begins within 500ms of logo completion (SC-001)
**Constraints**: Mobile-only viewport, < 200KB gzipped bundle, Lighthouse > 80
**Scale/Scope**: 6 questions, single-session form completion

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **I. Feature-Sliced Design** | ✅ PASS | Will create `widgets/stepper-form/` with proper segments (ui/, lib/, hooks/) |
| **II. TypeScript Strictness** | ✅ PASS | All types explicitly defined, no `any`, discriminated unions for question types |
| **III. Firebase Best Practices** | ✅ N/A | No Firebase interactions for this feature |
| **IV. Component & State Management** | ✅ PASS | Composition-based design, state colocated in custom hook, controlled form inputs |
| **V. Test-First Development** | ✅ PASS | Integration tests for form flow, component tests for shared UI |

**Pre-Phase 0 Gate**: ✅ PASSED - No violations, may proceed to research

**Post-Phase 1 Re-check**: ✅ PASSED
- FSD: Widget structure with ui/, lib/, hooks/ segments confirmed
- TypeScript: All interfaces defined with discriminated unions, no `any`
- Firebase: N/A for this feature
- Component patterns: Custom hook for state, controlled inputs, composition-based
- Testing: Test file locations identified in structure

## Project Structure

### Documentation (this feature)

```text
specs/003-stepper-form/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (internal API contracts)
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── App.tsx              # Application entry with DeviceGate
│   ├── main.tsx             # React root
│   └── index.css            # Global styles, theme variables
├── pages/
│   └── home/
│       ├── ui/HomePage.tsx  # MODIFY: Add animation completion handler, render StepperForm
│       └── index.ts
├── widgets/
│   ├── device-gate/         # Existing mobile viewport gate
│   └── stepper-form/        # NEW: Stepper form widget
│       ├── ui/
│       │   ├── StepperForm.tsx       # Main form container with slide-in animation
│       │   ├── QuestionStep.tsx      # Single question renderer
│       │   ├── ProgressIndicator.tsx # "2 of 6" display
│       │   └── index.ts              # Public API barrel export
│       ├── lib/
│       │   ├── types.ts              # Question, Answer, FormState types
│       │   ├── questions.ts          # Question data configuration
│       │   └── validation.ts         # Input validation logic
│       ├── hooks/
│       │   └── useStepperForm.ts     # Form state management hook
│       └── index.ts                  # Widget public API
├── shared/
│   ├── ui/
│   │   ├── button.tsx        # NEW: shadcn/ui Button component
│   │   ├── input.tsx         # NEW: shadcn/ui Input component
│   │   ├── label.tsx         # NEW: shadcn/ui Label component
│   │   ├── radio-group.tsx   # NEW: shadcn/ui RadioGroup component
│   │   ├── UnavailableScreen.tsx
│   │   └── index.ts
│   ├── lib/utils.ts          # cn() utility (existing)
│   └── hooks/                # (available for future shared hooks)
└── assets/
    └── react.svg

tests/
├── integration/
│   └── stepper-form-flow.test.tsx   # Full form completion flow test
└── unit/
    └── widgets/
        └── stepper-form/
            ├── useStepperForm.test.ts
            └── validation.test.ts
```

**Structure Decision**: Single frontend web application following Feature-Sliced Design. The stepper form is implemented as a widget (complex UI composition) that orchestrates question display, navigation, and progress. Shared UI components from shadcn/ui are installed to `src/shared/ui/` per constitution guidelines.

## Complexity Tracking

> No Constitution Check violations - table not required.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
