/**
 * Type definitions for the Stepper Form widget
 */

// =============================================================================
// Question Types
// =============================================================================

export type QuestionType = 'yes-no' | 'text' | 'phone'

export interface BaseQuestion {
  id: string
  text: string
  position: number
  required: boolean
}

export interface YesNoQuestion extends BaseQuestion {
  type: 'yes-no'
  options: readonly ['Yes', 'No']
}

export interface TextQuestion extends BaseQuestion {
  type: 'text'
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export interface PhoneQuestion extends BaseQuestion {
  type: 'phone'
  placeholder: string
}

export type Question = YesNoQuestion | TextQuestion | PhoneQuestion

// =============================================================================
// Answer Types
// =============================================================================

export type AnswerValue = string

export interface ValidationResult {
  isValid: boolean
  errorMessage: string | null
}

// =============================================================================
// Form State Types
// =============================================================================

export interface FormState {
  currentStep: number
  answers: Record<string, AnswerValue>
  isComplete: boolean
  validation: ValidationResult
  transitionDirection: 'forward' | 'backward' | null
}

export type FormAction =
  | { type: 'SET_ANSWER'; questionId: string; value: AnswerValue }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SUBMIT' }
  | { type: 'CLEAR_TRANSITION' }

// =============================================================================
// Animation Constants
// =============================================================================

export const ANIMATION_CONSTANTS = {
  QUESTION_TRANSITION_DURATION: 300,
  FORM_SLIDE_IN_DURATION: 400,
  FORM_APPEARANCE_DELAY: 100,
} as const
