# Research: Slide-Up Animation System

**Feature**: 004-slide-up-animations
**Date**: 2026-01-08

## Overview

This document captures research findings for implementing unified slide-up animations on the home page.

## Current Implementation Analysis

### Existing Animation: `logo-sequence`

**Location**: `tailwind.config.ts`

```text
Current keyframes:
- 0%: opacity 0, no transform
- 40%: opacity 1, centered
- 60%: hold centered
- 64-76%: horizontal shake (-20px to +20px oscillation)
- 80%: return to center
- 100%: opacity 0, translateY(-100vh) exit
```

**Issues with current approach**:
1. Horizontal shake conflicts with desired vertical-only pattern
2. Entry is opacity-based (fade), not position-based (slide)
3. Exit correctly uses translateY(-100vh) - this can be preserved

### Existing Animation: `slide-up-enter`

**Location**: `tailwind.config.ts`

```text
Current keyframes:
- 0%: opacity 0, translateY(100vh)
- 100%: opacity 1, translateY(0)
```

**Status**: Already correct for entry animations. Used by StepperForm and completion screen.

## Decision: Logo Animation Pattern

**Decision**: Modify `logo-sequence` to use slide-up entry instead of fade-in

**New keyframe structure**:
```text
- 0%: opacity 0, translateY(100vh) [start below viewport]
- 30%: opacity 1, translateY(0) [arrive at center]
- 70%: opacity 1, translateY(0) [hold at center]
- 100%: opacity 0, translateY(-100vh) [exit through top]
```

**Rationale**:
- Maintains single animation class for entire sequence
- Uses existing exit behavior (already correct)
- Replaces fade-in with slide-up entry
- Removes horizontal shake entirely
- Consistent with form entry pattern

**Alternatives considered**:
1. **Separate enter/exit animations**: Rejected - requires JavaScript orchestration
2. **Framer Motion library**: Rejected - adds unnecessary dependency for simple animations
3. **CSS transitions with state**: Rejected - more complex than keyframe approach

## Decision: Animation Timing

**Decision**: Use 1.6s total duration for logo sequence

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Entry (slide up) | 480ms (30%) | 0-480ms |
| Hold (visible) | 640ms (40%) | 480-1120ms |
| Exit (slide up) | 480ms (30%) | 1120-1600ms |

**Rationale**:
- Total duration matches current `logo-sequence` animation (1s) - can extend slightly
- Entry/exit use ease-out/ease-in respectively for natural motion
- Hold duration provides time to read/recognize logo

## Decision: Reduced Motion Support

**Decision**: Add `prefers-reduced-motion` media query support

**Implementation**:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up-enter {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Location**: `src/app/index.css` (global styles)

**Rationale**:
- Respects user accessibility preferences
- Instant appearance without motion
- Follows WCAG 2.1 guidelines

**Alternatives considered**:
1. **Shorter animations**: Rejected - still motion-based, not fully accessible
2. **JavaScript detection**: Rejected - CSS media query is simpler and more reliable

## Technical Findings

### CSS Transform Performance

- `transform: translateY()` is GPU-accelerated
- Does not trigger layout/reflow (paint-only)
- Smooth 60fps performance expected on all modern devices

### Animation Callback Behavior

- `onAnimationEnd` React event fires when CSS animation completes
- Works correctly with multi-phase keyframe animations
- Fires once at 100% completion, not at each keyframe

### Browser Support

- CSS Keyframe animations: 98%+ browser support
- `translateY` transform: Universal support
- `prefers-reduced-motion`: 96%+ browser support

## Files Requiring Changes

1. `tailwind.config.ts` - Keyframe modifications
2. `src/app/index.css` - Reduced motion support (optional enhancement)

## No Changes Required

- `src/pages/home/ui/HomePage.tsx` - Animation class name unchanged
- `src/widgets/stepper-form/ui/StepperForm.tsx` - Already uses correct animation
