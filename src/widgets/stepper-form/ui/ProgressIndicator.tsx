import { cn } from '@/shared/lib/utils'

interface ProgressIndicatorProps {
  current: number
  total: number
  className?: string
}

export function ProgressIndicator({ current, total, className }: ProgressIndicatorProps) {
  return (
    <div
      className={cn('text-sm text-muted-foreground', className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">Question </span>
      {current} of {total}
    </div>
  )
}
