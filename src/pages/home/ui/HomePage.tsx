import { useState } from 'react'
import { StepperForm } from '@/widgets/stepper-form'

export function HomePage() {
  const [animationComplete, setAnimationComplete] = useState(false)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {!animationComplete && (
        <img
          src="/logo.png"
          alt="2nd Fridays Social Club"
          className="max-w-xs w-auto h-auto animate-fade-in"
          onAnimationEnd={() => setAnimationComplete(true)}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      {animationComplete && <StepperForm />}
    </main>
  )
}
