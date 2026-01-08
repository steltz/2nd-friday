# Quickstart: Mobile-Only Home Page

**Feature**: 001-mobile-home
**Date**: 2026-01-08

## Prerequisites

- Node.js 20+ (LTS)
- npm or pnpm
- Modern browser with DevTools (for mobile viewport testing)

## Setup

```bash
# Clone and install (if not already done)
git clone <repository-url>
cd 2nd-friday
npm install

# Switch to feature branch
git checkout 001-mobile-home
```

## Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

## Testing the Feature

### Mobile View (viewport ≤ 480px)

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select a mobile device preset OR set custom width ≤ 480px
4. Verify: Home page with placeholder content displays

### Desktop View (viewport > 480px)

1. Open browser in normal desktop mode
2. Ensure window width is > 480px
3. Verify: "Unavailable" message displays

### Responsive Behavior

1. Start with mobile viewport (≤ 480px)
2. Gradually resize browser wider than 480px
3. Verify: View switches to unavailable message
4. Resize back to ≤ 480px
5. Verify: Home page content reappears

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/App.tsx` | Root component, wraps content with DeviceGate |
| `src/pages/home/ui/HomePage.tsx` | Mobile home page content |
| `src/widgets/device-gate/ui/DeviceGate.tsx` | Viewport-based content switcher |
| `src/widgets/device-gate/lib/useViewport.ts` | Viewport detection hook |
| `src/shared/ui/UnavailableScreen.tsx` | Desktop fallback message |

## Troubleshooting

### Content doesn't switch on resize
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify `useViewport` hook is properly mounted

### Wrong view shows initially
- Clear browser cache
- Check if SSR/hydration is conflicting (should default to client state)

### Horizontal scroll appears on mobile
- Check for fixed-width elements in content
- Verify Tailwind `max-w-full` or `overflow-x-hidden` is applied

## Success Criteria Verification

| Criteria | How to Verify |
|----------|---------------|
| SC-001: Mobile users see home page | Open at ≤480px, content visible |
| SC-002: Desktop users see unavailable | Open at >480px, message visible |
| SC-003: <100ms transition | Resize and observe instant switch |
| SC-004: <2s load time | DevTools Network tab, check load timing |
| SC-005: No horizontal scroll | Mobile view, try scrolling horizontally |
