import { useViewport } from '../lib/useViewport'
import { UnavailableScreen } from '@/shared/ui'
import type { DeviceGateProps } from '../lib/types'

/**
 * Component that gates content based on viewport size
 * Shows children on mobile (≤480px), fallback on larger screens
 */
export function DeviceGate({ children, fallback }: DeviceGateProps) {
  const { isMobile } = useViewport()

  if (isMobile) {
    return <>{children}</>
  }

  return <>{fallback ?? <UnavailableScreen />}</>
}
