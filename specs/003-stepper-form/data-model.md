# Data Model: Stepper Form with Quiz Questions

**Feature Branch**: `003-stepper-form`
**Date**: 2026-01-08

## Overview

This document defines the data entities, their relationships, and validation rules for the stepper form feature. All data is client-side only (no persistence per spec assumptions).

---

## Entities

### Question

Represents a single step in the stepper form.

```typescript
/**
 * Discriminated union for question types.
 * Each type has specific input requirements and validation rules.
 */
type QuestionType = 'yes-no' | 'text' | 'phone'

interface BaseQuestion {
  /** Unique identifier for the question */
  id: string
  /** Question text displayed to the user */
  text: string
  /** Position in the form sequence (1-indexed) */
  position: number
  /** Whether an answer is required before proceeding */
  required: boolean
}

interface YesNoQuestion extends BaseQuestion {
  type: 'yes-no'
  options: readonly ['Yes', 'No']
}

interface TextQuestion extends BaseQuestion {
  type: 'text'
  /** Optional placeholder text for the input */
  placeholder?: string
  /** Minimum character length (default: 1) */
  minLength?: number
  /** Maximum character length */
  maxLength?: number
}

interface PhoneQuestion extends BaseQuestion {
  type: 'phone'
  /** Placeholder showing expected format */
  placeholder: string
}

type Question = YesNoQuestion | TextQuestion | PhoneQuestion
```

### Question Data Configuration

```typescript
const QUESTIONS: readonly Question[] = [
  {
    id: 'meat',
    text: 'Do you eat meat?',
    position: 1,
    type: 'yes-no',
    options: ['Yes', 'No'] as const,
    required: true,
  },
  {
    id: 'drinks',
    text: 'When going out, how many drinks is a good time?',
    position: 2,
    type: 'text',
    placeholder: 'Enter a number or describe',
    required: true,
  },
  {
    id: 'clark-griswold',
    text: 'When Clark Griswold gets accidentally locked in the basement while hiding presents, what power tool does he use to cut a hole in the door to escape?',
    position: 3,
    type: 'text',
    placeholder: 'Your answer',
    required: true,
  },
  {
    id: 'get-out',
    text: 'In the movie Get Out, what is the place called when someone gets hypnotized?',
    position: 4,
    type: 'text',
    placeholder: 'Your answer',
    required: true,
  },
  {
    id: 'nickname',
    text: 'What is your nickname?',
    position: 5,
    type: 'text',
    placeholder: 'Enter your nickname',
    minLength: 1,
    maxLength: 50,
    required: true,
  },
  {
    id: 'phone',
    text: 'Enter phone number',
    position: 6,
    type: 'phone',
    placeholder: '(555) 123-4567',
    required: true,
  },
] as const

const TOTAL_QUESTIONS = QUESTIONS.length // 6
```

---

### UserResponse

The answer provided by the user for a single question.

```typescript
/**
 * Answer value type varies by question type
 */
type AnswerValue = string // All answers stored as strings for simplicity

interface UserResponse {
  /** Reference to the question being answered */
  questionId: string
  /** The user's answer */
  value: AnswerValue
  /** Timestamp when answer was provided */
  answeredAt: Date
}
```

---

### FormProgress

Tracks the user's current position and state in the form.

```typescript
interface FormProgress {
  /** Current question index (0-indexed internally, displayed as 1-indexed) */
  currentStep: number
  /** Total number of questions */
  totalSteps: number
  /** Map of question IDs to their answers */
  answers: Record<string, AnswerValue>
  /** Whether the form has been completed */
  isComplete: boolean
  /** Validation state for the current question */
  validation: ValidationState
}

interface ValidationState {
  /** Whether the current answer is valid */
  isValid: boolean
  /** Error message if invalid */
  errorMessage: string | null
}
```

---

### FormState (Reducer State)

Complete state managed by `useStepperForm` hook.

```typescript
interface FormState {
  currentStep: number
  answers: Record<string, AnswerValue>
  isComplete: boolean
  validation: ValidationState
  /** Animation state for transitions */
  transitionDirection: 'forward' | 'backward' | null
}

const initialFormState: FormState = {
  currentStep: 0,
  answers: {},
  isComplete: false,
  validation: { isValid: false, errorMessage: null },
  transitionDirection: null,
}
```

---

### FormAction (Reducer Actions)

Actions that can be dispatched to modify form state.

```typescript
type FormAction =
  | { type: 'SET_ANSWER'; questionId: string; value: AnswerValue }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SUBMIT' }
  | { type: 'SET_VALIDATION'; isValid: boolean; errorMessage: string | null }
  | { type: 'CLEAR_TRANSITION' }
```

---

## Validation Rules

### Per Question Type

| Question Type | Validation Rules |
|---------------|------------------|
| `yes-no` | Must be 'Yes' or 'No' |
| `text` | Must not be empty; respects minLength/maxLength if specified |
| `phone` | Must match phone pattern and have at least 10 digits |

### Phone Validation

```typescript
/**
 * Phone validation rules from research.md
 */
const phoneValidation = {
  /** Pattern accepts common US phone formats */
  pattern: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,

  /** Minimum digits when formatting characters removed */
  minDigits: 10,

  /** Validation function */
  validate(value: string): { isValid: boolean; error: string | null } {
    if (!value.trim()) {
      return { isValid: false, error: 'Phone number is required' }
    }

    if (!this.pattern.test(value)) {
      return { isValid: false, error: 'Please enter a valid phone number' }
    }

    const digitsOnly = value.replace(/\D/g, '')
    if (digitsOnly.length < this.minDigits) {
      return { isValid: false, error: 'Phone number must have at least 10 digits' }
    }

    return { isValid: true, error: null }
  }
}
```

### Text Validation

```typescript
const textValidation = {
  validate(
    value: string,
    options?: { minLength?: number; maxLength?: number }
  ): { isValid: boolean; error: string | null } {
    const trimmed = value.trim()

    if (!trimmed) {
      return { isValid: false, error: 'This field is required' }
    }

    if (options?.minLength && trimmed.length < options.minLength) {
      return {
        isValid: false,
        error: `Must be at least ${options.minLength} characters`
      }
    }

    if (options?.maxLength && trimmed.length > options.maxLength) {
      return {
        isValid: false,
        error: `Must be no more than ${options.maxLength} characters`
      }
    }

    return { isValid: true, error: null }
  }
}
```

---

## State Transitions

### Form Flow State Machine

```
┌──────────────┐
│   Initial    │ (currentStep: 0, no answers)
└──────┬───────┘
       │ User answers Q1
       ▼
┌──────────────┐
│ Question 1   │ ◄────────────┐
└──────┬───────┘              │
       │ NEXT (valid)         │ BACK
       ▼                      │
┌──────────────┐              │
│ Question 2   │ ─────────────┘
└──────┬───────┘
       │ NEXT (valid)
       ▼
      ...
       │
       ▼
┌──────────────┐
│ Question 6   │
└──────┬───────┘
       │ SUBMIT (valid phone)
       ▼
┌──────────────┐
│  Complete    │ (isComplete: true)
└──────────────┘
```

### Transition Rules

1. **NEXT**: Only allowed if current answer is valid; increments `currentStep`
2. **BACK**: Only allowed if `currentStep > 0`; decrements `currentStep`
3. **SUBMIT**: Only allowed on last question with valid phone number
4. **SET_ANSWER**: Updates `answers[questionId]` and triggers validation
5. **CLEAR_TRANSITION**: Resets `transitionDirection` after animation completes

---

## Entity Relationships

```
┌─────────────────────────────────────────────────────────┐
│                      FormProgress                        │
│  ┌─────────────────────────────────────────────────┐    │
│  │ currentStep: number ────────────┐               │    │
│  │ totalSteps: 6                   │               │    │
│  │ answers: Record<string, string> │               │    │
│  │ isComplete: boolean             │               │    │
│  └─────────────────────────────────┼───────────────┘    │
└────────────────────────────────────┼────────────────────┘
                                     │
                    references       │
                                     ▼
┌─────────────────────────────────────────────────────────┐
│                    Question[]                            │
│  ┌─────────────┐ ┌─────────────┐      ┌─────────────┐   │
│  │  Question   │ │  Question   │ ...  │  Question   │   │
│  │  id: meat   │ │  id: drinks │      │  id: phone  │   │
│  │  position:1 │ │  position:2 │      │  position:6 │   │
│  │  type:yes-no│ │  type:text  │      │  type:phone │   │
│  └─────────────┘ └─────────────┘      └─────────────┘   │
└─────────────────────────────────────────────────────────┘
                                     │
                    stored as        │
                                     ▼
┌─────────────────────────────────────────────────────────┐
│                   UserResponse[]                         │
│  (ephemeral, stored in FormProgress.answers)            │
│  { questionId: 'meat', value: 'Yes' }                   │
│  { questionId: 'drinks', value: '3' }                   │
│  ...                                                    │
└─────────────────────────────────────────────────────────┘
```

---

## File Locations

| Entity | File Path |
|--------|-----------|
| Question types | `src/widgets/stepper-form/lib/types.ts` |
| Question data | `src/widgets/stepper-form/lib/questions.ts` |
| Validation logic | `src/widgets/stepper-form/lib/validation.ts` |
| FormState/Actions | `src/widgets/stepper-form/hooks/useStepperForm.ts` |
