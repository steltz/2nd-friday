import type { Question } from './types'

export const QUESTIONS: readonly Question[] = [
  {
    id: 'meat',
    text: 'Do you eat meat?',
    position: 1,
    type: 'yes-no',
    options: ['Yes', 'No'] as const,
    required: true,
  },
  {
    id: 'drinks',
    text: 'When going out, how many drinks is a good time?',
    position: 2,
    type: 'text',
    placeholder: 'Enter a number or describe',
    required: true,
  },
  {
    id: 'clark-griswold',
    text: 'When Clark Griswold gets accidentally locked in the basement while hiding presents, what power tool does he use to cut a hole in the door to escape?',
    position: 3,
    type: 'text',
    placeholder: 'Your answer',
    required: true,
  },
  {
    id: 'get-out',
    text: 'In the movie Get Out, what is the place called when someone gets hypnotized?',
    position: 4,
    type: 'text',
    placeholder: 'Your answer',
    required: true,
  },
  {
    id: 'nickname',
    text: 'What is your nickname?',
    position: 5,
    type: 'text',
    placeholder: 'Enter your nickname',
    minLength: 1,
    maxLength: 50,
    required: true,
  },
  {
    id: 'phone',
    text: 'Enter phone number',
    position: 6,
    type: 'phone',
    placeholder: '(555) 123-4567',
    required: true,
  },
] as const

export const TOTAL_QUESTIONS = QUESTIONS.length
