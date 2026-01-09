# Tasks: Slide-Up Animation System

**Input**: Design documents from `/specs/004-slide-up-animations/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: Visual animations - manual verification only (no automated tests per plan.md)

**Organization**: Tasks grouped by user story for independent verification

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths included in all descriptions

## Path Conventions

- **Project type**: Single web application (frontend only)
- **Root**: Repository root
- **Source**: `src/`
- **Config**: `tailwind.config.ts`

---

## Phase 1: Setup

**Purpose**: No setup required - using existing project infrastructure

*This phase is empty for this feature as all dependencies (Tailwind, React) already exist.*

**Checkpoint**: Ready to proceed with implementation

---

## Phase 2: Foundational (Animation Keyframes)

**Purpose**: Update core animation definitions that all user stories depend on

**⚠️ CRITICAL**: Logo animation keyframes must be updated before testing any user story

- [x] T001 Update `logo-sequence` keyframes to use slide-up entry pattern in tailwind.config.ts
- [x] T002 Update animation duration from 1s to 1.6s for logo sequence in tailwind.config.ts
- [x] T003 [P] Add `prefers-reduced-motion` media query support in src/app/index.css

**Checkpoint**: Animation definitions ready - user story verification can begin

---

## Phase 3: User Story 1 & 2 - Logo Entry and Exit Animation (Priority: P1) 🎯 MVP

**Goal**: Logo smoothly enters from bottom of viewport, holds at center, then exits through top

**Independent Test**: Load home page fresh, observe logo slide up from bottom, pause at center, then slide up through top before form appears

**Note**: US1 (entry) and US2 (exit) are combined in a single CSS keyframe animation, so they share tasks

### Implementation for User Stories 1 & 2

- [x] T004 [US1/US2] Verify `animate-fade-in` class in src/pages/home/ui/HomePage.tsx triggers updated keyframes
- [x] T005 [US1/US2] Verify `onAnimationEnd` callback fires correctly after full sequence completes in src/pages/home/ui/HomePage.tsx
- [ ] T006 [US1/US2] Manual test: Logo slides up from bottom of viewport to center
- [ ] T007 [US1/US2] Manual test: Logo holds at center for visible duration (~640ms)
- [ ] T008 [US1/US2] Manual test: Logo slides up through top of viewport to exit

**Checkpoint**: Logo animation complete with slide-up entry and exit pattern

---

## Phase 4: User Story 3 - Stepper Form Entry Animation (Priority: P1)

**Goal**: Stepper form smoothly enters from bottom after logo exits

**Independent Test**: After logo exit completes, observe stepper form slide up from bottom to final position

### Implementation for User Story 3

- [x] T009 [US3] Verify `animate-slide-up-enter` class exists on StepperForm container in src/widgets/stepper-form/ui/StepperForm.tsx
- [ ] T010 [US3] Manual test: Stepper form appears immediately after logo exit animation completes
- [ ] T011 [US3] Manual test: Stepper form slides up from below viewport to final centered position

**Checkpoint**: Stepper form entry animation working with consistent slide-up pattern

---

## Phase 5: User Story 4 - Completion Screen Entry Animation (Priority: P2)

**Goal**: Completion/thank you screen enters with same slide-up pattern after form submission

**Independent Test**: Complete the stepper form, observe completion message slide up from bottom

### Implementation for User Story 4

- [x] T012 [US4] Verify `animate-slide-up-enter` class exists on completion screen container in src/widgets/stepper-form/ui/StepperForm.tsx
- [ ] T013 [US4] Manual test: Complete form submission and observe completion screen animation
- [ ] T014 [US4] Manual test: Completion screen slides up smoothly to centered position

**Checkpoint**: All animated elements use consistent slide-up pattern

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility verification and build validation

- [ ] T015 [P] Manual test: Enable OS reduced motion setting, verify animations are instant (no sliding)
- [x] T016 [P] Run `npm run build` and verify no TypeScript or build errors
- [x] T017 [P] Run `npm run lint` and verify no ESLint errors
- [ ] T018 Verify animation performance: 60fps, no jank or frame drops during animations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Empty - no setup required
- **Foundational (Phase 2)**: No dependencies - start immediately with T001
- **User Stories 1&2 (Phase 3)**: Depends on Phase 2 (T001-T003) completion
- **User Story 3 (Phase 4)**: Depends on Phase 2 completion (can run parallel with Phase 3)
- **User Story 4 (Phase 5)**: Depends on Phase 2 completion (can run parallel with Phase 3)
- **Polish (Phase 6)**: Depends on all user stories being verified

### User Story Dependencies

- **User Stories 1&2 (P1)**: Depends on Foundational (T001-T003)
- **User Story 3 (P1)**: Depends on Foundational - no dependency on US1/US2
- **User Story 4 (P2)**: Depends on Foundational - no dependency on other stories

### Parallel Opportunities

Within Phase 2 (Foundational):
- T003 can run in parallel with T001/T002 (different files)

User Story Phases (3, 4, 5):
- All can start in parallel once Phase 2 completes
- They test independent elements (logo vs form vs completion)

Within Phase 6 (Polish):
- T015, T016, T017 can all run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Sequential (same file):
Task: "T001 Update logo-sequence keyframes in tailwind.config.ts"
Task: "T002 Update animation duration in tailwind.config.ts"

# In parallel (different file):
Task: "T003 Add prefers-reduced-motion support in src/app/index.css"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2)

1. Complete Phase 2: Foundational (T001-T003)
2. Complete Phase 3: User Stories 1 & 2 (T004-T008)
3. **STOP and VALIDATE**: Logo animation working with slide-up pattern
4. Proceed to verify existing animations (US3, US4)

### Incremental Delivery

1. Update keyframes (T001-T002) → Logo works
2. Verify form animation (T009-T011) → Form works
3. Verify completion animation (T012-T014) → Completion works
4. Add accessibility (T003) + Build validation (T015-T018)

### Single Developer Execution Order

```text
T001 → T002 → T003 (parallel OK) → T004 → T005 → T006 → T007 → T008 →
T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018
```

---

## Notes

- This feature primarily modifies animation keyframes (1 file: tailwind.config.ts)
- Most tasks are verification tasks since existing components already use correct class names
- User Stories 3 & 4 are "verify existing behavior" since `animate-slide-up-enter` already exists
- No automated tests - visual animations verified manually per constitution
- Commit after T002 (keyframes updated) and T003 (accessibility added)
