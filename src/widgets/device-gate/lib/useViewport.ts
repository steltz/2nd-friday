import { useState, useEffect } from 'react'
import type { ViewportState } from './types'

const MOBILE_BREAKPOINT = 480

/**
 * Hook for detecting mobile viewport state
 * Uses matchMedia API for performant viewport detection
 */
export function useViewport(): ViewportState {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return { isMobile }
}
