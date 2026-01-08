import { useEffect, useRef } from 'react'
import { cn } from '@/shared/lib/utils'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import type { Question, AnswerValue } from '../lib/types'

interface QuestionStepProps {
  question: Question
  value: AnswerValue
  onChange: (value: AnswerValue) => void
  autoFocus?: boolean
  error?: string | null
  transitionDirection: 'forward' | 'backward' | null
  onKeyDown?: (e: React.KeyboardEvent) => void
}

function YesNoInput({
  question,
  value,
  onChange,
}: {
  question: Question & { type: 'yes-no' }
  value: AnswerValue
  onChange: (value: AnswerValue) => void
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex flex-col gap-3"
    >
      {question.options.map((option) => (
        <div key={option} className="flex items-center space-x-3">
          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
          <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

function TextInput({
  question,
  value,
  onChange,
  inputRef,
  onKeyDown,
}: {
  question: Question & { type: 'text' }
  value: AnswerValue
  onChange: (value: AnswerValue) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  onKeyDown?: (e: React.KeyboardEvent) => void
}) {
  return (
    <Input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      maxLength={question.maxLength}
      onKeyDown={onKeyDown}
      className="w-full"
    />
  )
}

function PhoneInput({
  question,
  value,
  onChange,
  inputRef,
  onKeyDown,
}: {
  question: Question & { type: 'phone' }
  value: AnswerValue
  onChange: (value: AnswerValue) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  onKeyDown?: (e: React.KeyboardEvent) => void
}) {
  return (
    <Input
      ref={inputRef}
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      onKeyDown={onKeyDown}
      className="w-full"
    />
  )
}

export function QuestionStep({
  question,
  value,
  onChange,
  autoFocus = true,
  error,
  transitionDirection,
  onKeyDown,
}: QuestionStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus, question.id])

  const renderInput = () => {
    switch (question.type) {
      case 'yes-no':
        return (
          <YesNoInput
            question={question}
            value={value}
            onChange={onChange}
          />
        )
      case 'text':
        return (
          <TextInput
            question={question}
            value={value}
            onChange={onChange}
            inputRef={inputRef}
            onKeyDown={onKeyDown}
          />
        )
      case 'phone':
        return (
          <PhoneInput
            question={question}
            value={value}
            onChange={onChange}
            inputRef={inputRef}
            onKeyDown={onKeyDown}
          />
        )
      default: {
        const _exhaustive: never = question
        return _exhaustive
      }
    }
  }

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        transitionDirection === 'forward' && 'animate-in slide-in-from-right',
        transitionDirection === 'backward' && 'animate-in slide-in-from-left'
      )}
    >
      <Label className="text-base font-medium mb-4 block">{question.text}</Label>
      <div className="mt-4">{renderInput()}</div>
      {error && (
        <p className="text-sm text-destructive mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
