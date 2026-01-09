import type { Question, ValidationResult } from './types'

/**
 * Phone validation pattern
 * Accepts: (555) 123-4567, 555-123-4567, 5551234567, +1 555 123 4567
 */
const PHONE_PATTERN = /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/
const MIN_PHONE_DIGITS = 10

export function validatePhone(value: string): ValidationResult {
  const trimmed = value.trim()

  if (!trimmed) {
    return { isValid: false, errorMessage: 'Phone number is required' }
  }

  if (!PHONE_PATTERN.test(trimmed)) {
    return { isValid: false, errorMessage: 'Please enter a valid phone number' }
  }

  const digitsOnly = trimmed.replace(/\D/g, '')
  if (digitsOnly.length < MIN_PHONE_DIGITS) {
    return { isValid: false, errorMessage: 'Phone number must have at least 10 digits' }
  }

  return { isValid: true, errorMessage: null }
}

export function validateText(
  value: string,
  options?: { minLength?: number; maxLength?: number }
): ValidationResult {
  const trimmed = value.trim()

  if (!trimmed) {
    return { isValid: false, errorMessage: 'This field is required' }
  }

  if (options?.minLength && trimmed.length < options.minLength) {
    return {
      isValid: false,
      errorMessage: `Must be at least ${options.minLength} characters`,
    }
  }

  if (options?.maxLength && trimmed.length > options.maxLength) {
    return {
      isValid: false,
      errorMessage: `Must be no more than ${options.maxLength} characters`,
    }
  }

  return { isValid: true, errorMessage: null }
}

export function validateYesNo(value: string): ValidationResult {
  const trimmed = value.trim()

  if (!trimmed) {
    return { isValid: false, errorMessage: 'Please select an option' }
  }

  if (trimmed !== 'Yes' && trimmed !== 'No') {
    return { isValid: false, errorMessage: 'Please select Yes or No' }
  }

  return { isValid: true, errorMessage: null }
}

export function validateAnswer(value: string, question: Question): ValidationResult {
  switch (question.type) {
    case 'yes-no':
      return validateYesNo(value)
    case 'phone':
      return validatePhone(value)
    case 'text':
      return validateText(value, {
        minLength: question.minLength,
        maxLength: question.maxLength,
      })
    case 'textarea':
      return validateText(value)
    default: {
      const _exhaustive: never = question
      return _exhaustive
    }
  }
}
