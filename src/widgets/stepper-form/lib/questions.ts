import type { Question } from './types'

export const QUESTIONS: readonly Question[] = [
  {
    id: 'drinks',
    text: 'When going out, how many drinks is a good time?',
    position: 1,
    type: 'text',
    placeholder: 'Enter a number',
    inputMode: 'numeric',
    required: true,
  },
  {
    id: 'wine-tasting',
    text: 'Pretend you just did a tasting for a new glass of wine, give us the tasting notes',
    position: 2,
    type: 'textarea',
    placeholder: 'Describe the wine...',
    rows: 4,
    required: true,
  },
  {
    id: 'walkout-song',
    text: "What's your MLB walkout song?",
    position: 3,
    type: 'text',
    placeholder: 'Song title',
    required: true,
  },
  {
    id: 'nickname',
    text: 'Middle name + Street you grew up on?',
    position: 4,
    type: 'text',
    placeholder: 'Your answer',
    required: true,
  },
  {
    id: 'phone',
    text: 'Cell Phone Number',
    position: 5,
    type: 'phone',
    placeholder: '(555) 123-4567',
    required: true,
  },
] as const

export const TOTAL_QUESTIONS = QUESTIONS.length
