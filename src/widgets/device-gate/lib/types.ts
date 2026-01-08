import type { ReactNode } from 'react'

/**
 * Viewport classification for mobile-only gating
 */
export interface ViewportState {
  /** True when viewport width is 480px or less */
  isMobile: boolean
}

/**
 * Props for the DeviceGate component
 */
export interface DeviceGateProps {
  /** Content to show on mobile devices */
  children: ReactNode
  /** Optional custom fallback for non-mobile devices */
  fallback?: ReactNode
}
