/**
 * Component Interface Contracts
 *
 * Feature: Stepper Form with Quiz Questions
 * Branch: 003-stepper-form
 *
 * This file defines the TypeScript interfaces for component props
 * and the public API contract for the stepper-form widget.
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
  | { type: 'SET_VALIDATION'; isValid: boolean; errorMessage: string | null }
  | { type: 'CLEAR_TRANSITION' }

// =============================================================================
// Component Props Contracts
// =============================================================================

/**
 * StepperForm - Main form container
 *
 * Renders the complete stepper form with animation, progress indicator,
 * and question navigation.
 */
export interface StepperFormProps {
  /** Callback when form is submitted with all answers */
  onComplete?: (answers: Record<string, AnswerValue>) => void
  /** Optional CSS class for the form container */
  className?: string
}

/**
 * QuestionStep - Renders a single question
 *
 * Handles input rendering based on question type and manages
 * the enter/exit transition animations.
 */
export interface QuestionStepProps {
  /** The question to render */
  question: Question
  /** Current answer value (empty string if not answered) */
  value: AnswerValue
  /** Called when the user changes their answer */
  onChange: (value: AnswerValue) => void
  /** Whether the input should be focused on mount */
  autoFocus?: boolean
  /** Validation error message to display */
  error?: string | null
  /** Animation state for transitions */
  animationState: 'entering' | 'visible' | 'exiting'
}

/**
 * ProgressIndicator - Shows current position in form
 *
 * Displays "N of M" format per spec requirement FR-004.
 */
export interface ProgressIndicatorProps {
  /** Current question number (1-indexed for display) */
  current: number
  /** Total number of questions */
  total: number
  /** Optional CSS class */
  className?: string
}

/**
 * NavigationButtons - Next/Back/Submit controls
 *
 * Renders appropriate buttons based on current form position.
 */
export interface NavigationButtonsProps {
  /** Whether we're on the first question (hides Back button) */
  isFirst: boolean
  /** Whether we're on the last question (shows Submit instead of Next) */
  isLast: boolean
  /** Whether the current answer is valid (enables Next/Submit) */
  canProceed: boolean
  /** Called when Next or Submit is clicked */
  onNext: () => void
  /** Called when Back is clicked */
  onBack: () => void
  /** Whether form is submitting */
  isSubmitting?: boolean
}

// =============================================================================
// Hook Contracts
// =============================================================================

/**
 * useStepperForm - Form state management hook
 *
 * Returns the current form state and action dispatchers.
 */
export interface UseStepperFormReturn {
  /** Current form state */
  state: FormState
  /** Current question based on step */
  currentQuestion: Question
  /** Total number of questions */
  totalQuestions: number
  /** Answers as a record */
  answers: Record<string, AnswerValue>
  /** Whether the form is complete */
  isComplete: boolean
  /** Set answer for current question */
  setAnswer: (value: AnswerValue) => void
  /** Navigate to next question */
  next: () => void
  /** Navigate to previous question */
  back: () => void
  /** Submit the form */
  submit: () => void
  /** Whether navigation is possible */
  canGoNext: boolean
  canGoBack: boolean
}

// =============================================================================
// Validation Contracts
// =============================================================================

/**
 * Validator function signature
 */
export type Validator = (value: AnswerValue, question: Question) => ValidationResult

/**
 * Validation utilities interface
 */
export interface ValidationUtils {
  validateAnswer: Validator
  validatePhone: (value: string) => ValidationResult
  validateText: (value: string, options?: { minLength?: number; maxLength?: number }) => ValidationResult
  validateYesNo: (value: string) => ValidationResult
}

// =============================================================================
// Animation Constants
// =============================================================================

export const ANIMATION_CONSTANTS = {
  /** Duration for question transitions (ms) */
  QUESTION_TRANSITION_DURATION: 300,
  /** Duration for form slide-in animation (ms) */
  FORM_SLIDE_IN_DURATION: 400,
  /** Delay after logo animation before form appears (ms) */
  FORM_APPEARANCE_DELAY: 100,
} as const
