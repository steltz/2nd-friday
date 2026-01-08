# Data Model: Mobile-Only Home Page

**Feature**: 001-mobile-home
**Date**: 2026-01-08

## Overview

This feature has no persistent data storage requirements. All state is ephemeral and derived from browser viewport dimensions.

## Client-Side State

### ViewportState

Runtime state representing the current viewport classification.

| Field | Type | Description |
|-------|------|-------------|
| `isMobile` | `boolean` | `true` if viewport width ≤ 480px |

**Derivation**: Computed from `window.matchMedia('(max-width: 480px)')` on client-side only.

**Lifecycle**:
- Initial: Set synchronously on component mount
- Updates: Triggered by browser resize/orientation change events via `matchMedia` listener
- Cleanup: Listener removed on component unmount

## Type Definitions

```typescript
// src/widgets/device-gate/lib/types.ts

/**
 * Viewport classification for mobile-only gating
 */
export interface ViewportState {
  /** True when viewport width is 480px or less */
  isMobile: boolean;
}

/**
 * Props for the DeviceGate component
 */
export interface DeviceGateProps {
  /** Content to show on mobile devices */
  children: React.ReactNode;
  /** Optional custom fallback for non-mobile devices */
  fallback?: React.ReactNode;
}
```

## Entities

No database entities required for this feature.

## Relationships

N/A - No persistent entities.

## Validation Rules

| Rule | Constraint |
|------|------------|
| Mobile threshold | Viewport width ≤ 480px classified as mobile |
| Boundary behavior | Exactly 480px is considered mobile |

## State Transitions

```
┌─────────────────┐    resize/orientation    ┌─────────────────┐
│  isMobile: true │ ◄─────────────────────► │ isMobile: false │
│  (≤480px)       │                          │  (>480px)       │
└─────────────────┘                          └─────────────────┘
```

Transitions are immediate (<100ms target) and bidirectional based on viewport changes.
