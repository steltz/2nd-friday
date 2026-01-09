import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

interface FormAnswers {
  [key: string]: string
}

export async function saveSubmission(answers: FormAnswers): Promise<void> {
  try {
    await addDoc(collection(db, 'submissions'), {
      ...answers,
      submittedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Failed to save submission:', error)
  }
}
