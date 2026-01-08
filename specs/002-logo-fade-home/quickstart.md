# Quickstart: Logo Fade-In Home Page

**Feature**: 002-logo-fade-home
**Branch**: `002-logo-fade-home`

## Overview

Replace the home page content with a centered logo that fades in slowly when the page loads.

## Prerequisites

- Node.js 20+
- Project dependencies installed (`npm install`)

## Quick Test

```bash
# Start dev server
npm run dev

# Open in mobile viewport (≤480px) or use browser dev tools
# Navigate to http://localhost:5173
# Logo should fade in over ~2 seconds
```

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/home/ui/HomePage.tsx` | Replace content with animated logo |
| `tailwind.config.ts` | Add custom `fade-in` animation keyframes |

## Implementation Checklist

1. [ ] Add `fade-in` keyframes to `tailwind.config.ts`
2. [ ] Update `HomePage.tsx` to render only the logo
3. [ ] Apply centering classes (flexbox)
4. [ ] Apply `animate-fade-in` class to logo
5. [ ] Add `onError` handler for graceful degradation
6. [ ] Visual test on mobile viewport
7. [ ] Test page refresh (animation should replay)

## Verification

- [ ] Logo appears centered on screen
- [ ] Logo fades in from transparent to opaque
- [ ] Animation takes ~2 seconds
- [ ] Animation replays on refresh
- [ ] No broken image if logo fails to load
- [ ] Existing DeviceGate behavior unchanged

## Related Artifacts

- [Specification](./spec.md)
- [Implementation Plan](./plan.md)
- [Research](./research.md)
