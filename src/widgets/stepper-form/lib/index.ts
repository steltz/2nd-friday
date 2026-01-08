export type {
  QuestionType,
  BaseQuestion,
  YesNoQuestion,
  TextQuestion,
  PhoneQuestion,
  Question,
  AnswerValue,
  ValidationResult,
  FormState,
  FormAction,
} from './types'

export { ANIMATION_CONSTANTS } from './types'

export { QUESTIONS, TOTAL_QUESTIONS } from './questions'

export {
  validatePhone,
  validateText,
  validateYesNo,
  validateAnswer,
} from './validation'
