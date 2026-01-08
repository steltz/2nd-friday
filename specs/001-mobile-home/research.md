# Research: Mobile-Only Home Page

**Feature**: 001-mobile-home
**Date**: 2026-01-08

## Research Questions

### 1. Viewport Detection Approach

**Decision**: Use a custom React hook with `window.matchMedia` API

**Rationale**:
- `matchMedia` is the standard browser API for media queries in JavaScript
- More performant than listening to resize events directly
- Provides a clean callback interface for viewport changes
- Works consistently across all modern browsers
- Aligns with Tailwind's breakpoint system

**Alternatives Considered**:
- **CSS-only approach (Tailwind `hidden`/`block` classes)**: Simpler but renders both components to DOM, potentially impacting performance and accessibility
- **resize event listener**: Works but fires excessively, requires debouncing, less elegant
- **Container queries**: Newer API, not universally supported yet

### 2. Mobile Breakpoint Value

**Decision**: 480px viewport width as the mobile threshold

**Rationale**:
- Specified in requirements (A-001)
- Covers most smartphones in portrait mode
- Excludes tablets and small laptops
- Standard breakpoint for "mobile-only" applications

**Alternatives Considered**:
- **640px (Tailwind `sm`)**: Would include some tablets, not strict enough for mobile-only
- **320px**: Too restrictive, would exclude many modern phones
- **Device detection via User Agent**: Unreliable, easily spoofed, not recommended

### 3. Component Architecture

**Decision**: DeviceGate widget pattern wrapping page content

**Rationale**:
- Follows Feature-Sliced Design (widgets layer)
- Reusable across future pages if app expands
- Single source of truth for viewport logic
- Clean separation: gate handles viewport, page handles content

**Alternatives Considered**:
- **Inline conditional in App.tsx**: Works but less reusable, harder to test
- **Higher-Order Component**: Older pattern, hooks are preferred in modern React
- **Context provider**: Overkill for simple boolean state, adds unnecessary complexity

### 4. Tailwind Custom Breakpoint

**Decision**: Define custom `mobile` breakpoint at 480px in Tailwind config

**Rationale**:
- Tailwind's default breakpoints start at 640px (`sm`)
- Custom breakpoint allows CSS-based styling aligned with JS logic
- Single source of truth for the 480px threshold
- Works with both CSS and JS approaches

**Implementation**:
```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'mobile': { max: '480px' },  // Mobile-only styles
      'sm': '640px',               // Keep defaults
      // ...
    }
  }
}
```

### 5. Unavailable Screen Design

**Decision**: Centered message with clear call-to-action

**Rationale**:
- Simple, clear communication of mobile-only restriction
- No complex UI needed for blocking screen
- Accessible and readable on all screen sizes
- Can be enhanced later with app store links if native apps exist

**Content Structure**:
- Heading: Clear statement that app is mobile-only
- Subtext: Brief explanation suggesting mobile device
- Optional: Icon/illustration for visual interest

## Performance Considerations

- **Initial render**: Use `matchMedia` with initial state to avoid flash of wrong content
- **SSR hydration**: Handle server-side rendering gracefully (default to mobile view, hydrate on client)
- **Bundle size**: No additional dependencies needed beyond React and Tailwind

## Testing Strategy

- **Unit tests**: `useViewport` hook with mocked `matchMedia`
- **Integration tests**: DeviceGate component with viewport state changes
- **Visual regression**: Verify both views render correctly at different widths

## Open Questions (Resolved)

All technical questions resolved. No blockers for Phase 1.
