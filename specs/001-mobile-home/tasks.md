# Tasks: Mobile-Only Home Page

**Input**: Design documents from `/specs/001-mobile-home/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: No tests explicitly requested in feature specification. Tests are omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Feature-Sliced Design frontend
- **Base path**: `src/` at repository root
- **FSD layers**: `app/`, `pages/`, `widgets/`, `shared/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Vite + React + TypeScript project with Tailwind CSS and shadcn/ui

- [x] T001 Initialize Vite project with React and TypeScript template in repository root
- [x] T002 Install and configure Tailwind CSS with PostCSS in `tailwind.config.ts` and `postcss.config.js`
- [x] T003 [P] Configure custom mobile breakpoint (480px) in `tailwind.config.ts`
- [x] T004 [P] Initialize shadcn/ui with `npx shadcn@latest init` configuring `src/shared/ui/` as components path
- [x] T005 [P] Configure TypeScript strict mode in `tsconfig.json` (strict: true)
- [x] T006 Create FSD directory structure: `src/app/`, `src/pages/`, `src/widgets/`, `src/shared/`

**Checkpoint**: Project builds and runs with `npm run dev`, showing default Vite page

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core viewport detection infrastructure that MUST be complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create type definitions for ViewportState and DeviceGateProps in `src/widgets/device-gate/lib/types.ts`
- [x] T008 Implement useViewport hook with matchMedia API in `src/widgets/device-gate/lib/useViewport.ts`
- [x] T009 Create barrel export for device-gate widget in `src/widgets/device-gate/index.ts`

**Checkpoint**: Foundation ready - `useViewport` hook returns correct `isMobile` state based on viewport width

---

## Phase 3: User Story 1 - Mobile User Views Home Page (Priority: P1) 🎯 MVP

**Goal**: Display placeholder content on mobile devices (viewport ≤480px)

**Independent Test**: Open app at viewport width ≤480px, verify placeholder content displays without horizontal scroll

### Implementation for User Story 1

- [x] T010 [US1] Create HomePage component with placeholder text content in `src/pages/home/ui/HomePage.tsx`
- [x] T011 [US1] Create barrel export for home page in `src/pages/home/index.ts`
- [x] T012 [US1] Create DeviceGate component that renders children on mobile in `src/widgets/device-gate/ui/DeviceGate.tsx`
- [x] T013 [US1] Update device-gate barrel export to include DeviceGate component in `src/widgets/device-gate/index.ts`
- [x] T014 [US1] Create App component wrapping HomePage with DeviceGate in `src/app/App.tsx`
- [x] T015 [US1] Configure global styles with Tailwind base in `src/app/index.css`
- [x] T016 [US1] Create main entry point mounting App in `src/app/main.tsx`
- [x] T017 [US1] Update Vite config to use `src/app/main.tsx` as entry in `vite.config.ts`

**Checkpoint**: Mobile home page displays with placeholder content at viewport ≤480px

---

## Phase 4: User Story 2 - Desktop User Sees Unavailable Message (Priority: P2)

**Goal**: Display "unavailable" message on non-mobile devices (viewport >480px)

**Independent Test**: Open app at viewport width >480px, verify unavailable message displays with clear explanation

### Implementation for User Story 2

- [x] T018 [US2] Create UnavailableScreen component with mobile-only message in `src/shared/ui/UnavailableScreen.tsx`
- [x] T019 [US2] Create barrel export for shared UI in `src/shared/ui/index.ts`
- [x] T020 [US2] Update DeviceGate to render UnavailableScreen as fallback in `src/widgets/device-gate/ui/DeviceGate.tsx`
- [x] T021 [US2] Add real-time viewport change handling (resize/orientation) in `src/widgets/device-gate/lib/useViewport.ts`

**Checkpoint**: Unavailable message displays at viewport >480px, transitions smoothly on resize

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [x] T022 [P] Verify no horizontal scroll on mobile by testing at various mobile widths
- [x] T023 [P] Validate viewport transition occurs within 100ms target
- [x] T024 Run quickstart.md validation checklist
- [x] T025 Verify Lighthouse Performance score >80 on production build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on Foundational completion; can run parallel to US1 but US1 provides DeviceGate base
- **Polish (Phase 5)**: Depends on both user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on DeviceGate from US1 (T012) but adds fallback behavior independently

### Within Each User Story

- Types/models before hooks
- Hooks before components
- Components before integration
- Story complete before moving to next priority

### Parallel Opportunities

**Setup Phase**:
```
T003, T004, T005 can run in parallel after T001, T002
```

**User Story 1**:
```
T010, T011 can run in parallel (different slices)
T012, T013 depend on T007-T009 (foundational)
T014-T017 are sequential (integration)
```

**User Story 2**:
```
T018, T019 can run in parallel with US1 tasks
T020, T021 depend on T012 from US1
```

**Polish Phase**:
```
T022, T023 can run in parallel
T024, T025 are sequential validation
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T009)
3. Complete Phase 3: User Story 1 (T010-T017)
4. **STOP and VALIDATE**: Test at mobile viewport - placeholder content visible
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Project runs, hook ready
2. Add User Story 1 → Mobile users see home page (MVP!)
3. Add User Story 2 → Desktop users see unavailable message
4. Polish → Performance validated, ready for production

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- US1 is the MVP - mobile home page is core functionality
- US2 adds desktop fallback - enhances UX but not blocking
- No tests included (not explicitly requested in spec)
- Commit after each task or logical group
- FSD structure: pages import from widgets, widgets import from shared
