import { useEffect, useState } from 'react'
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

  const [completionPhase, setCompletionPhase] = useState<'form' | 'fading' | 'gif' | 'gif-fading' | 'logo'>('form')

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

  useEffect(() => {
    if (isComplete && completionPhase === 'form') {
      setCompletionPhase('fading')
    }
  }, [isComplete, completionPhase])

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

  const handleFormFadeOutEnd = () => {
    setCompletionPhase('gif')
  }

  const handleGifFadeInEnd = () => {
    setTimeout(() => {
      setCompletionPhase('gif-fading')
    }, 3000)
  }

  const handleGifFadeOutEnd = () => {
    setCompletionPhase('logo')
  }

  if (completionPhase === 'logo') {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="2nd Fridays Social Club"
          className="max-w-xs w-auto h-auto animate-slide-down-enter"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
    )
  }

  if (completionPhase === 'gif' || completionPhase === 'gif-fading') {
    return (
      <div
        className={cn(
          'fixed inset-0 flex items-center justify-center',
          completionPhase === 'gif' && 'animate-in fade-in duration-1000',
          completionPhase === 'gif-fading' && 'animate-fade-out'
        )}
        onAnimationEnd={
          completionPhase === 'gif'
            ? handleGifFadeInEnd
            : handleGifFadeOutEnd
        }
      >
        <img
          src="/good_luck.gif"
          alt="Good luck"
          className="max-w-xs w-auto h-auto"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto p-6 pb-32',
        completionPhase === 'form' && 'animate-in fade-in duration-1000',
        completionPhase === 'fading' && 'animate-fade-out',
        className
      )}
      onAnimationEnd={completionPhase === 'fading' ? handleFormFadeOutEnd : undefined}
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
