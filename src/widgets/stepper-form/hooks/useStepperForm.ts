import { useReducer, useCallback, useMemo } from 'react'
import type { FormState, FormAction, AnswerValue } from '../lib/types'
import { QUESTIONS, TOTAL_QUESTIONS } from '../lib/questions'
import { validateAnswer } from '../lib/validation'

const initialFormState: FormState = {
  currentStep: 0,
  answers: {},
  isComplete: false,
  validation: { isValid: false, errorMessage: null },
  transitionDirection: null,
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_ANSWER': {
      const question = QUESTIONS[state.currentStep]
      const validation = validateAnswer(action.value, question)
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.value,
        },
        validation,
      }
    }

    case 'NEXT': {
      if (state.currentStep >= TOTAL_QUESTIONS - 1) {
        return state
      }
      const nextStep = state.currentStep + 1
      const nextQuestion = QUESTIONS[nextStep]
      const existingAnswer = state.answers[nextQuestion.id] ?? ''
      const validation = existingAnswer
        ? validateAnswer(existingAnswer, nextQuestion)
        : { isValid: false, errorMessage: null }
      return {
        ...state,
        currentStep: nextStep,
        validation,
        transitionDirection: 'forward',
      }
    }

    case 'BACK': {
      if (state.currentStep <= 0) {
        return state
      }
      const prevStep = state.currentStep - 1
      const prevQuestion = QUESTIONS[prevStep]
      const existingAnswer = state.answers[prevQuestion.id] ?? ''
      const validation = existingAnswer
        ? validateAnswer(existingAnswer, prevQuestion)
        : { isValid: false, errorMessage: null }
      return {
        ...state,
        currentStep: prevStep,
        validation,
        transitionDirection: 'backward',
      }
    }

    case 'SUBMIT': {
      if (state.currentStep !== TOTAL_QUESTIONS - 1) {
        return state
      }
      if (!state.validation.isValid) {
        return state
      }
      return {
        ...state,
        isComplete: true,
        transitionDirection: 'forward',
      }
    }

    case 'CLEAR_TRANSITION': {
      return {
        ...state,
        transitionDirection: null,
      }
    }

    default:
      return state
  }
}

export function useStepperForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState)

  const currentQuestion = QUESTIONS[state.currentStep]

  const setAnswer = useCallback(
    (value: AnswerValue) => {
      dispatch({
        type: 'SET_ANSWER',
        questionId: currentQuestion.id,
        value,
      })
    },
    [currentQuestion.id]
  )

  const next = useCallback(() => {
    dispatch({ type: 'NEXT' })
  }, [])

  const back = useCallback(() => {
    dispatch({ type: 'BACK' })
  }, [])

  const submit = useCallback(() => {
    dispatch({ type: 'SUBMIT' })
  }, [])

  const clearTransition = useCallback(() => {
    dispatch({ type: 'CLEAR_TRANSITION' })
  }, [])

  const canGoNext = useMemo(() => {
    return state.validation.isValid && state.currentStep < TOTAL_QUESTIONS - 1
  }, [state.validation.isValid, state.currentStep])

  const canGoBack = useMemo(() => {
    return state.currentStep > 0
  }, [state.currentStep])

  const canSubmit = useMemo(() => {
    return state.validation.isValid && state.currentStep === TOTAL_QUESTIONS - 1
  }, [state.validation.isValid, state.currentStep])

  const isLastQuestion = state.currentStep === TOTAL_QUESTIONS - 1

  return {
    state,
    currentQuestion,
    totalQuestions: TOTAL_QUESTIONS,
    answers: state.answers,
    isComplete: state.isComplete,
    setAnswer,
    next,
    back,
    submit,
    clearTransition,
    canGoNext,
    canGoBack,
    canSubmit,
    isLastQuestion,
  }
}
