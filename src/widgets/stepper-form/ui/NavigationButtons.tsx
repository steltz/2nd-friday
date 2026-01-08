import { Button } from '@/shared/ui/button'

interface NavigationButtonsProps {
  isFirst: boolean
  isLast: boolean
  canProceed: boolean
  onNext: () => void
  onBack: () => void
  isSubmitting?: boolean
}

export function NavigationButtons({
  isFirst,
  isLast,
  canProceed,
  onNext,
  onBack,
  isSubmitting = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-3 mt-6">
      {!isFirst && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
      )}
      <Button
        type="button"
        onClick={onNext}
        disabled={!canProceed || isSubmitting}
        className="flex-1"
      >
        {isLast ? 'Submit' : 'Next'}
      </Button>
    </div>
  )
}
