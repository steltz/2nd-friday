import { useEffect } from 'react'
import { cn } from '@/shared/lib/utils'
import { useStepperForm } from '../hooks/useStepperForm'
import { ProgressIndicator } from './ProgressIndicator'
import { QuestionStep } from './QuestionStep'
import { NavigationButtons } from './NavigationButtons'
import type { AnswerValue } from '../lib/types'
import { ANIMATION_CONSTANTS } from '../lib/types'

interface StepperFormProps {
  onComplete?: (answers: Record<string, AnswerValue>) => void
  className?: string
}

export function StepperForm({ onComplete, className }: StepperFormProps) {
  const {
    state,
    currentQuestion,
    totalQuestions,
    answers,
    isComplete,
    setAnswer,
    next,
    back,
    submit,
    clearTransition,
    canGoNext,
    canGoBack,
    canSubmit,
    isLastQuestion,
  } = useStepperForm()

  const currentAnswer = answers[currentQuestion.id] ?? ''
  const validationError = state.validation.errorMessage

  useEffect(() => {
    if (state.transitionDirection) {
      const timer = setTimeout(() => {
        clearTransition()
      }, ANIMATION_CONSTANTS.QUESTION_TRANSITION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [state.transitionDirection, clearTransition])

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete(answers)
    }
  }, [isComplete, onComplete, answers])

  const handleNext = () => {
    if (isLastQuestion) {
      submit()
    } else {
      next()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (canGoNext || canSubmit) {
        handleNext()
      }
    }
  }

  if (isComplete) {
    return (
      <div
        className={cn(
          'w-full max-w-md mx-auto p-6 animate-slide-up-enter',
          className
        )}
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
          <p className="text-muted-foreground">Your responses have been submitted.</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto p-6 animate-slide-up-enter',
        className
      )}
    >
      <ProgressIndicator
        current={state.currentStep + 1}
        total={totalQuestions}
        className="mb-6"
      />

      <QuestionStep
        question={currentQuestion}
        value={currentAnswer}
        onChange={setAnswer}
        error={currentAnswer ? validationError : null}
        transitionDirection={state.transitionDirection}
        onKeyDown={handleKeyDown}
      />

      <NavigationButtons
        isFirst={!canGoBack}
        isLast={isLastQuestion}
        canProceed={canGoNext || canSubmit}
        onNext={handleNext}
        onBack={back}
      />
    </div>
  )
}
