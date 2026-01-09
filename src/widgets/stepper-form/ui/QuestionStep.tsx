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
      inputMode={question.inputMode}
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

function TextareaInput({
  question,
  value,
  onChange,
  textareaRef,
}: {
  question: Question & { type: 'textarea' }
  value: AnswerValue
  onChange: (value: AnswerValue) => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}) {
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      rows={question.rows ?? 4}
      className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus) {
      if (question.type === 'textarea' && textareaRef.current) {
        textareaRef.current.focus()
      } else if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [autoFocus, question.id, question.type])

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
      case 'textarea':
        return (
          <TextareaInput
            question={question}
            value={value}
            onChange={onChange}
            textareaRef={textareaRef}
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
        transitionDirection && 'animate-in fade-in'
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
