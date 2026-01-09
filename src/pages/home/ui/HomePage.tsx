import { useState } from 'react'
import { StepperForm } from '@/widgets/stepper-form'
import { Button } from '@/shared/ui/button'
import { saveSubmission } from '@/shared/lib/services/submissions'

type PagePhase = 'logo' | 'jigsaw' | 'jigsaw-fading' | 'form'

export function HomePage() {
  const [phase, setPhase] = useState<PagePhase>('logo')

  const handleLogoAnimationEnd = () => {
    setPhase('jigsaw')
  }

  const handleButtonClick = () => {
    setPhase('jigsaw-fading')
  }

  const handleJigsawFadeOutEnd = () => {
    setPhase('form')
  }

  const isFormPhase = phase === 'form'

  return (
    <main
      className={`min-h-dvh flex flex-col items-center overflow-x-hidden ${
        isFormPhase ? 'justify-start pt-12' : 'justify-center'
      }`}
    >
      {phase === 'logo' && (
        <img
          src="/logo.png"
          alt="2nd Fridays Social Club"
          className="max-w-xs w-auto h-auto animate-fade-in"
          onAnimationEnd={handleLogoAnimationEnd}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}

      {(phase === 'jigsaw' || phase === 'jigsaw-fading') && (
        <div
          className={`flex flex-col items-center gap-6 ${
            phase === 'jigsaw' ? 'animate-in fade-in duration-1000' : 'animate-fade-out'
          }`}
          onAnimationEnd={phase === 'jigsaw-fading' ? handleJigsawFadeOutEnd : undefined}
        >
          <img
            src="/jigsaw.gif"
            alt="Jigsaw"
            className="max-w-xs w-auto h-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <Button onClick={handleButtonClick} size="lg" className="py-6 bg-red-600 hover:bg-red-700 text-white">
            Answer the questions to earn an invite to 2nd Fridays
          </Button>
        </div>
      )}

      {phase === 'form' && <StepperForm onComplete={saveSubmission} />}
    </main>
  )
}
