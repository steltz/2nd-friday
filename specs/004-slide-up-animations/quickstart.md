# Quickstart: Slide-Up Animation System

**Feature**: 004-slide-up-animations
**Date**: 2026-01-08

## Overview

This feature updates all home page animations to use a unified slide-up pattern where elements enter from the bottom of the viewport and exit through the top.

## Prerequisites

- Node.js 20+
- npm or pnpm
- Project dependencies installed (`npm install`)

## Quick Implementation Summary

### Files to Modify

| File | Change Type | Description |
|------|-------------|-------------|
| `tailwind.config.ts` | Modify | Update `logo-sequence` keyframes |
| `src/app/index.css` | Add | Reduced motion media query (optional) |

### Key Changes

1. **Update logo animation keyframes** in `tailwind.config.ts`:
   - Replace opacity fade-in with `translateY(100vh)` entry
   - Remove horizontal shake (lines 17-21 in current config)
   - Keep existing exit behavior (`translateY(-100vh)`)

2. **Add accessibility support** (optional but recommended):
   - Add `prefers-reduced-motion` media query in global CSS

### No Changes Required

- `HomePage.tsx` - Animation class name (`animate-fade-in`) stays the same
- `StepperForm.tsx` - Already uses `animate-slide-up-enter`
- Other components - No animation changes

## Testing

1. Run dev server: `npm run dev`
2. Open browser to localhost
3. Verify:
   - Logo slides up from bottom on page load
   - Logo slides up through top when exiting
   - Stepper form slides up from bottom after logo exits
   - Completion screen slides up after form submit
4. Test reduced motion:
   - Enable "Reduce motion" in OS accessibility settings
   - Verify animations are instant (no sliding)

## Build Verification

```bash
npm run build    # Should complete with no errors
npm run lint     # Should pass ESLint checks
```

## Animation Timing Reference

| Element | Total Duration | Entry | Hold | Exit |
|---------|---------------|-------|------|------|
| Logo | 1600ms | 480ms | 640ms | 480ms |
| Stepper Form | 400ms | 400ms | - | - |
| Completion | 400ms | 400ms | - | - |
