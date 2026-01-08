# Research: Stepper Form with Quiz Questions

**Feature Branch**: `003-stepper-form`
**Date**: 2026-01-08
**Status**: Complete

## Overview

This document captures research findings and technical decisions for implementing the stepper form feature. All unknowns from the Technical Context have been resolved.

---

## 1. Logo Animation Completion Detection

### Decision
Use the native `onAnimationEnd` React event on the logo `<img>` element to detect when the CSS animation completes.

### Rationale
- The logo animation is a pure CSS animation (`animate-fade-in` class mapped to `logo-sequence` keyframes)
- React supports synthetic `onAnimationEnd` events that fire when CSS animations complete
- No additional libraries needed; works with existing tailwindcss-animate setup
- Animation duration is exactly 1000ms (1 second) based on tailwind.config.ts

### Alternatives Considered
1. **setTimeout with hardcoded duration** - Rejected because it's brittle; any animation timing changes would break synchronization
2. **Framer Motion** - Rejected because it would add bundle size for a simple callback need
3. **CSS animation iteration count polling** - Overly complex for this use case

### Implementation Notes
```tsx
// In HomePage.tsx
const [animationComplete, setAnimationComplete] = useState(false)

<img
  src="/logo.png"
  className="animate-fade-in"
  onAnimationEnd={() => setAnimationComplete(true)}
/>

{animationComplete && <StepperForm />}
```

---

## 2. Form Slide-In Animation Strategy

### Decision
Create a custom Tailwind keyframe animation `slide-in-from-bottom` that mirrors the existing animation pattern, using CSS transforms for performance.

### Rationale
- Consistent with existing codebase approach (custom Tailwind keyframes)
- CSS transforms are GPU-accelerated, ensuring smooth 60fps animation
- `tailwindcss-animate` already installed, provides animation utilities
- Success criteria SC-001 requires animation to begin within 500ms of logo completion

### Alternatives Considered
1. **Framer Motion** - Rejected; adds ~30KB to bundle, overkill for entrance animation
2. **React Spring** - Rejected; similar bundle concern, physics-based animation not needed
3. **tailwindcss-animate built-in** - `animate-in slide-in-from-bottom` exists but doesn't provide precise control over timing

### Implementation Notes
```typescript
// tailwind.config.ts addition
keyframes: {
  'slide-up-enter': {
    '0%': { opacity: '0', transform: 'translateY(100vh)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
},
animation: {
  'slide-up-enter': 'slide-up-enter 400ms ease-out forwards',
}
```

---

## 3. Question Transition Animation

### Decision
Use CSS transitions with `transform` and `opacity` for smooth question-to-question transitions, managed by React state.

### Rationale
- SC-004 requires transitions complete within 300ms
- CSS transitions are simpler than keyframe animations for this use case
- React state controls which question is displayed; CSS handles the visual transition
- Exit/enter can be staggered or overlapped as needed

### Alternatives Considered
1. **React Transition Group** - Considered but adds complexity; simple CSS achieves the goal
2. **View Transitions API** - Browser support still limited; not production-ready
3. **Instant swap (no animation)** - Rejected; spec requires smooth transitions

### Implementation Notes
```tsx
// QuestionStep.tsx - transition classes
<div className={cn(
  "transition-all duration-300 ease-out",
  isEntering && "translate-x-0 opacity-100",
  isExiting && "-translate-x-full opacity-0"
)}>
```

---

## 4. Form State Management

### Decision
Use a custom React hook (`useStepperForm`) with `useReducer` for managing form state, including current step, answers, and validation.

### Rationale
- Per constitution IV, state should live close to where it's used
- `useReducer` provides clear action-based state transitions (NEXT, BACK, SET_ANSWER)
- No external state library needed; form state is entirely local
- Discriminated union for actions enables type-safe state management

### Alternatives Considered
1. **React Context** - Overkill; state doesn't need to be shared outside the form widget
2. **Zustand** - Not needed; no persistence or cross-component sharing required
3. **React Hook Form** - Adds dependency; custom hook is simpler for this linear form

### Implementation Notes
```typescript
// useStepperForm.ts structure
type FormAction =
  | { type: 'SET_ANSWER'; questionId: string; answer: AnswerValue }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SUBMIT' }

interface FormState {
  currentStep: number
  answers: Record<string, AnswerValue>
  isComplete: boolean
}
```

---

## 5. Question Input Types

### Decision
Use shadcn/ui components for form inputs: `RadioGroup` for Yes/No, `Input` with type="text" for text answers, and `Input` with type="tel" for phone number.

### Rationale
- Constitution requires shadcn/ui for design system consistency
- Components are accessible (Radix UI primitives underneath)
- Built-in keyboard navigation and ARIA support
- Phone input uses native `tel` type for mobile keyboard optimization

### Alternatives Considered
1. **Custom components** - Rejected; shadcn/ui already provides these
2. **Third-party phone input library** - Rejected; simple format validation is sufficient per spec
3. **Number input for drinks question** - Considered but text input allows more flexible answers

### Question Type Mapping
| Question | Input Type | Component |
|----------|-----------|-----------|
| Do you eat meat? | Yes/No | RadioGroup |
| How many drinks? | Text/Number | Input (text) |
| Clark Griswold | Text | Input (text) |
| Get Out | Text | Input (text) |
| Nickname | Text | Input (text) |
| Phone number | Phone | Input (tel) |

---

## 6. Phone Number Validation

### Decision
Use a simple regex pattern for US phone number validation, accepting common formats with optional formatting characters.

### Rationale
- Spec assumption states "common formats (with or without country code, dashes, parentheses)"
- Complex validation libraries add bundle weight for minimal benefit
- SC-005 requires all submitted phone numbers pass format validation

### Pattern
```typescript
// Accepts: (555) 123-4567, 555-123-4567, 5551234567, +1 555 123 4567
const phonePattern = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/

// Minimum 10 digits when stripped of formatting
const minDigits = (phone: string) => phone.replace(/\D/g, '').length >= 10
```

### Alternatives Considered
1. **libphonenumber-js** - Overkill; adds significant bundle size
2. **HTML5 pattern attribute only** - Insufficient for custom error messages
3. **Strict formatting requirement** - Rejected; per spec, flexible formats should be accepted

---

## 7. Progress Indicator Design

### Decision
Simple text-based progress indicator showing "N of 6" format, positioned at the top of the form.

### Rationale
- Spec FR-004 specifically calls for "2 of 6" style progress
- Simple, accessible, and clear for users
- No need for progress bar or step dots for 6-question form

### Implementation Notes
```tsx
// ProgressIndicator.tsx
<span className="text-sm text-muted-foreground">
  {currentStep} of {totalSteps}
</span>
```

---

## 8. Component Installation Plan

### Required shadcn/ui Components
Install via CLI to `src/shared/ui/`:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add radio-group
```

### Rationale
- Button: Navigation controls (Next, Back, Submit)
- Input: Text, number, and phone inputs
- Label: Accessible form labels
- RadioGroup: Yes/No question type

---

## 9. Animation Timing Specification

### Timeline
1. **Logo animation**: 0ms - 1000ms (existing)
2. **Gap**: 1000ms - 1100ms (100ms pause for visual separation)
3. **Form slide-in start**: 1100ms (within 500ms of logo completion per SC-001)
4. **Form slide-in complete**: 1500ms (400ms animation duration)
5. **Question transitions**: 300ms each (per SC-004)

### Implementation
- Use `setTimeout` with 100ms delay after `onAnimationEnd` for smoother UX
- Or trigger immediately (0ms delay) if instant appearance preferred

---

## 10. Accessibility Considerations

### Requirements
- All form inputs must have associated labels
- Focus management: auto-focus first input on each question
- Keyboard navigation: Enter to submit answer, Tab between elements
- Screen reader announcements for progress changes

### Implementation
- shadcn/ui components have built-in accessibility
- Use `aria-live` region for progress updates
- Manage focus with `useEffect` on step changes

---

## Summary

All technical unknowns have been resolved. The implementation will use:
- Native CSS animations via Tailwind custom keyframes
- `onAnimationEnd` for logo completion detection
- Custom `useStepperForm` hook with `useReducer` for state management
- shadcn/ui components for form inputs
- Simple regex validation for phone numbers
- Text-based progress indicator

No additional dependencies required beyond existing tech stack.
