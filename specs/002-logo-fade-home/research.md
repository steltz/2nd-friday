# Research: Logo Fade-In Home Page

**Feature**: 002-logo-fade-home
**Date**: 2026-01-08

## Research Summary

This feature is straightforward with no significant unknowns. All required technologies are already in the project.

---

## 1. Tailwind CSS Fade-In Animation

### Decision
Use custom Tailwind animation via `tailwind.config.ts` for the fade-in effect with ~2 second duration.

### Rationale
- The project already includes `tailwindcss-animate` plugin
- Custom keyframes provide precise control over timing
- CSS animations are performant (GPU-accelerated)
- No additional dependencies required

### Alternatives Considered

| Alternative | Rejected Because |
|-------------|-----------------|
| Framer Motion | Adds ~30KB to bundle, overkill for single animation |
| React state + CSS transition | More complex, requires useEffect/useState |
| Built-in animate-in | Duration not customizable (too fast) |

### Implementation Pattern

```typescript
// tailwind.config.ts - Add custom animation
keyframes: {
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
},
animation: {
  'fade-in': 'fade-in 2s ease-out forwards',
},
```

```tsx
// Usage in component
<img className="animate-fade-in" ... />
```

---

## 2. Image Centering Approach

### Decision
Use Tailwind flexbox utilities for viewport centering.

### Rationale
- Consistent with existing project patterns
- `min-h-screen` + `flex items-center justify-center` is idiomatic
- Works across all mobile viewports

### Pattern

```tsx
<main className="min-h-screen flex items-center justify-center">
  <img ... />
</main>
```

---

## 3. Image Error Handling

### Decision
Use `img` `onError` handler to hide broken image gracefully.

### Rationale
- Native browser API, no dependencies
- Simple state toggle or CSS fallback
- Meets FR-008 requirement

### Pattern

```tsx
<img
  src="/logo.png"
  alt="2nd Fridays Social Club"
  onError={(e) => e.currentTarget.style.display = 'none'}
/>
```

---

## 4. Logo Sizing

### Decision
Use responsive width with `max-w-xs` or similar constraint.

### Rationale
- Prevents logo from being too large on any viewport
- Maintains aspect ratio with `w-auto h-auto`
- Appropriate for mobile-first design

---

## Resolved Clarifications

| Item | Resolution |
|------|------------|
| Animation duration | 2 seconds (spec suggested 1.5-2s, 2s feels appropriately "slow") |
| Animation timing | `ease-out` for natural deceleration |
| Logo size | `max-w-xs` (~320px max) with auto height |

---

## No Further Research Needed

All technical decisions are resolved. Ready for Phase 1 design.
