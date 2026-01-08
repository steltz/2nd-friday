# Tasks: Logo Fade-In Home Page

**Input**: Design documents from `/specs/002-logo-fade-home/`
**Prerequisites**: plan.md, spec.md, research.md, quickstart.md

**Tests**: Not required (visual animation feature, manual QA per constitution check)

**Organization**: Single user story - all tasks contribute to the same goal.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1 only for this feature)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Web application with FSD architecture
- **Source**: `src/` at repository root
- **Config**: Root level (e.g., `tailwind.config.ts`)

---

## Phase 1: Setup

**Purpose**: Verify prerequisites are in place

- [X] T001 Verify logo asset exists at public/logo.png
- [X] T002 Verify tailwindcss-animate plugin is configured in tailwind.config.ts

**Checkpoint**: Prerequisites confirmed

---

## Phase 2: User Story 1 - View Logo on Home Page (Priority: P1) 🎯 MVP

**Goal**: Display the 2nd Fridays Social Club logo centered on the home page with a slow fade-in animation on page load.

**Independent Test**: Navigate to home page on mobile viewport (≤480px) and observe:
1. Logo appears centered horizontally and vertically
2. Logo fades in from transparent to opaque over ~2 seconds
3. Animation replays on page refresh

### Implementation for User Story 1

- [X] T003 [P] [US1] Add custom fade-in keyframes and animation to tailwind.config.ts
- [X] T004 [US1] Replace HomePage content with centered animated logo in src/pages/home/ui/HomePage.tsx
- [X] T005 [US1] Add onError handler for graceful image load failure in src/pages/home/ui/HomePage.tsx

**Checkpoint**: User Story 1 complete - logo displays with fade-in animation

---

## Phase 3: Polish & Verification

**Purpose**: Final validation and cleanup

- [X] T006 Visual test: Verify logo is centered on mobile viewport (≤480px)
- [X] T007 Visual test: Verify fade-in animation duration is ~2 seconds
- [X] T008 Visual test: Verify animation replays on page refresh
- [X] T009 Visual test: Verify DeviceGate still blocks non-mobile viewports
- [X] T010 Run linter: npm run lint
- [X] T011 Run build: npm run build

**Checkpoint**: Feature complete and validated

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup completion
- **Polish (Phase 3)**: Depends on User Story 1 completion

### Task Dependencies Within Phase 2

```
T003 (tailwind.config.ts) ─┐
                           ├──► T004 (HomePage.tsx) ──► T005 (error handler)
                           │
                           └──► Note: T003 creates the animation class that T004 uses
```

### Parallel Opportunities

- T003 can start immediately after Phase 1
- T004 depends on T003 (needs `animate-fade-in` class to exist)
- T005 can be done as part of T004 or immediately after

---

## Parallel Example

```bash
# Phase 1 can be done in parallel:
Task: "T001 Verify logo asset exists at public/logo.png"
Task: "T002 Verify tailwindcss-animate plugin is configured"

# Phase 3 visual tests can be done in parallel:
Task: "T006 Visual test: centered on mobile"
Task: "T007 Visual test: animation duration"
Task: "T008 Visual test: animation replay"
Task: "T009 Visual test: DeviceGate unchanged"
```

---

## Implementation Strategy

### MVP (This is the entire feature)

1. Complete Phase 1: Setup verification
2. Complete Phase 2: User Story 1 (all tasks)
3. Complete Phase 3: Polish & Verification
4. **DONE**: Feature is complete

### Estimated Effort

- Total tasks: 11
- Implementation tasks: 3 (T003, T004, T005)
- Verification tasks: 6 (T006-T011)
- Files modified: 2 (`tailwind.config.ts`, `HomePage.tsx`)

---

## Notes

- No tests required - visual animation verified manually
- Single user story covers entire feature scope
- T003 must complete before T004 (animation class dependency)
- All verification tasks (T006-T011) are manual QA steps
- Commit after T005 to capture complete implementation
