# Quickstart: Stepper Form Implementation

**Feature Branch**: `003-stepper-form`
**Date**: 2026-01-08

## Prerequisites

- Node.js 20+ (LTS)
- npm or pnpm
- Git repository cloned and on branch `003-stepper-form`

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Required shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add radio-group
```

Components will be installed to `src/shared/ui/` per project configuration.

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 on a mobile device or use browser DevTools mobile simulation (≤480px viewport required).

## Project Structure Overview

```
src/
├── pages/home/ui/HomePage.tsx      # Entry point - triggers form after logo animation
├── widgets/stepper-form/           # NEW: Form widget to implement
│   ├── ui/                         # React components
│   ├── lib/                        # Types, data, validation
│   └── hooks/                      # useStepperForm hook
└── shared/ui/                      # shadcn/ui components
```

## Implementation Order

1. **Types & Data** (`src/widgets/stepper-form/lib/`)
   - Create `types.ts` with Question and FormState types
   - Create `questions.ts` with the 6 question definitions
   - Create `validation.ts` with validation logic

2. **State Management** (`src/widgets/stepper-form/hooks/`)
   - Implement `useStepperForm.ts` hook with useReducer

3. **UI Components** (`src/widgets/stepper-form/ui/`)
   - Create `ProgressIndicator.tsx`
   - Create `QuestionStep.tsx` with input type rendering
   - Create `StepperForm.tsx` main container with animations

4. **Integration** (`src/pages/home/ui/HomePage.tsx`)
   - Add `onAnimationEnd` handler to logo image
   - Conditionally render StepperForm after animation completes

5. **Animations** (`tailwind.config.ts`)
   - Add `slide-up-enter` keyframe animation

## Key Files to Reference

| Purpose | File |
|---------|------|
| Spec requirements | `specs/003-stepper-form/spec.md` |
| Technical decisions | `specs/003-stepper-form/research.md` |
| Data model | `specs/003-stepper-form/data-model.md` |
| Interface contracts | `specs/003-stepper-form/contracts/component-interfaces.ts` |
| Existing logo animation | `tailwind.config.ts` (keyframes.logo-sequence) |
| HomePage integration point | `src/pages/home/ui/HomePage.tsx` |

## Testing the Implementation

### Manual Testing Checklist

1. **Logo Animation**
   - [ ] Logo fades in, shakes, and slides up
   - [ ] Form appears after logo animation completes

2. **Form Slide-In**
   - [ ] Form slides up from bottom of screen smoothly
   - [ ] Animation begins within 500ms of logo completion

3. **Questions**
   - [ ] "Do you eat meat?" shows Yes/No options
   - [ ] "How many drinks?" shows text input
   - [ ] "Clark Griswold" question shows text input
   - [ ] "Get Out" question shows text input
   - [ ] "Nickname" shows text input
   - [ ] "Phone number" shows phone input with mobile keyboard

4. **Progress**
   - [ ] Shows "1 of 6" through "6 of 6" correctly
   - [ ] Updates as user progresses

5. **Navigation**
   - [ ] Next button advances to next question
   - [ ] Back button returns to previous question
   - [ ] Can't proceed without answering
   - [ ] Previous answers are preserved

6. **Validation**
   - [ ] Required field validation shows error
   - [ ] Phone validation checks format and length
   - [ ] Form completes after valid phone submission

### Automated Tests

```bash
npm test
```

Tests to implement:
- `tests/unit/widgets/stepper-form/useStepperForm.test.ts`
- `tests/unit/widgets/stepper-form/validation.test.ts`
- `tests/integration/stepper-form-flow.test.tsx`

## Common Issues

### Form doesn't appear after logo animation
- Check that `onAnimationEnd` is attached to the logo `<img>` element
- Verify animation class is `animate-fade-in`

### Mobile keyboard doesn't show correct type
- Ensure phone input uses `type="tel"`
- Check that Input component passes through the type prop

### Viewport gate blocking development
- Use Chrome DevTools device simulation
- Set viewport to ≤480px width

### shadcn/ui components not found
- Run the installation commands in step 2
- Check `components.json` paths match project structure

## Success Criteria Reference

| ID | Criteria | How to Verify |
|----|----------|---------------|
| SC-001 | Form slide-in begins within 500ms | DevTools Performance timeline |
| SC-002 | All 6 questions shown in order | Manual walkthrough |
| SC-003 | Form completable in under 2 minutes | Timed test |
| SC-004 | Transitions complete within 300ms | DevTools Performance |
| SC-005 | Phone validation works | Try invalid formats |
| SC-006 | Progress indicator accurate | Check each step |
