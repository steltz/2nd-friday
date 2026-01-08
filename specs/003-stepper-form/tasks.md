# Tasks: Stepper Form with Quiz Questions

**Input**: Design documents from `/specs/003-stepper-form/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not explicitly requested - manual QA via quickstart.md checklist

**Organization**: Tasks grouped by user story to enable independent implementation and testing

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create widget directory structure

- [x] T001 Install shadcn/ui Button component via `npx shadcn@latest add button` to src/shared/ui/
- [x] T002 [P] Install shadcn/ui Input component via `npx shadcn@latest add input` to src/shared/ui/
- [x] T003 [P] Install shadcn/ui Label component via `npx shadcn@latest add label` to src/shared/ui/
- [x] T004 [P] Install shadcn/ui RadioGroup component via `npx shadcn@latest add radio-group` to src/shared/ui/
- [x] T005 Create widget directory structure: src/widgets/stepper-form/{ui,lib,hooks}/
- [x] T006 Add slide-up-enter keyframe animation in tailwind.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, data, and validation that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create Question type definitions (BaseQuestion, YesNoQuestion, TextQuestion, PhoneQuestion) in src/widgets/stepper-form/lib/types.ts
- [x] T008 [P] Create FormState and FormAction type definitions in src/widgets/stepper-form/lib/types.ts
- [x] T009 [P] Create ValidationResult type in src/widgets/stepper-form/lib/types.ts
- [x] T010 Create QUESTIONS array with all 6 question definitions in src/widgets/stepper-form/lib/questions.ts
- [x] T011 Implement validatePhone function with regex pattern and 10-digit minimum in src/widgets/stepper-form/lib/validation.ts
- [x] T012 [P] Implement validateText function with minLength/maxLength support in src/widgets/stepper-form/lib/validation.ts
- [x] T013 [P] Implement validateYesNo function in src/widgets/stepper-form/lib/validation.ts
- [x] T014 Implement validateAnswer dispatcher function that routes to correct validator in src/widgets/stepper-form/lib/validation.ts
- [x] T015 Create widget barrel export in src/widgets/stepper-form/index.ts
- [x] T016 [P] Create lib barrel export in src/widgets/stepper-form/lib/index.ts

**Checkpoint**: Foundation ready - types, questions, and validation available for all stories

---

## Phase 3: User Story 1 - Complete the Stepper Form (Priority: P1) 🎯 MVP

**Goal**: Users can see the form slide in after logo animation, progress through all 6 questions one at a time, see progress indicator, and complete the form

**Independent Test**: Visit home page → watch logo animation → form slides in → answer all questions → see completion state

**Acceptance Criteria**:
- Form slides in smoothly from bottom after logo animation completes (FR-001, FR-002)
- Only one question displayed at a time (FR-003)
- Progress indicator shows "N of 6" format (FR-004)
- Questions appear in correct order (FR-005)
- Smooth transitions between questions (FR-006)
- Form indicates completion after final submission (FR-012)

### Implementation for User Story 1

- [x] T017 [US1] Implement useStepperForm hook with useReducer for state management in src/widgets/stepper-form/hooks/useStepperForm.ts
- [x] T018 [US1] Add formReducer function handling SET_ANSWER, NEXT, SUBMIT, CLEAR_TRANSITION actions in src/widgets/stepper-form/hooks/useStepperForm.ts
- [x] T019 [US1] Create ProgressIndicator component displaying "current of total" format in src/widgets/stepper-form/ui/ProgressIndicator.tsx
- [x] T020 [P] [US1] Create basic QuestionStep component shell (renders question text and placeholder input) in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T021 [US1] Create StepperForm container component with slide-up-enter animation in src/widgets/stepper-form/ui/StepperForm.tsx
- [x] T022 [US1] Wire StepperForm to useStepperForm hook and render ProgressIndicator in src/widgets/stepper-form/ui/StepperForm.tsx
- [x] T023 [US1] Implement question transition animations (300ms duration) with CSS transitions in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T024 [US1] Add Next/Submit button to StepperForm that advances to next question or completes form in src/widgets/stepper-form/ui/StepperForm.tsx
- [x] T025 [US1] Implement completion state UI (show success message when isComplete is true) in src/widgets/stepper-form/ui/StepperForm.tsx
- [x] T026 [US1] Create ui barrel export in src/widgets/stepper-form/ui/index.ts
- [x] T027 [US1] Add onAnimationEnd handler to logo image in src/pages/home/ui/HomePage.tsx
- [x] T028 [US1] Add animationComplete state and conditionally render StepperForm in src/pages/home/ui/HomePage.tsx

**Checkpoint**: User Story 1 complete - form slides in, shows questions one at a time with progress, can be completed

---

## Phase 4: User Story 2 - Answer Each Question Type (Priority: P1)

**Goal**: Each question renders the appropriate input type for its answer format

**Independent Test**: Navigate to each question → verify correct input renders (Yes/No radio, text input, phone input with tel keyboard)

**Acceptance Criteria**:
- "Do you eat meat?" shows Yes/No radio options (FR-008)
- Text questions show text input with placeholder (FR-008)
- Phone question shows tel input for mobile keyboard optimization (FR-008)
- Required validation prevents proceeding without answer (FR-007)
- Phone validation enforces format rules (FR-009)

### Implementation for User Story 2

- [x] T029 [US2] Implement YesNoInput subcomponent using shadcn RadioGroup in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T030 [P] [US2] Implement TextInput subcomponent using shadcn Input with type="text" in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T031 [P] [US2] Implement PhoneInput subcomponent using shadcn Input with type="tel" in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T032 [US2] Add question type discrimination logic to QuestionStep to render correct input component in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T033 [US2] Integrate validation with StepperForm - disable Next until current answer is valid in src/widgets/stepper-form/ui/StepperForm.tsx
- [x] T034 [US2] Display validation error messages below input when validation fails in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T035 [US2] Add auto-focus to input element when question mounts in src/widgets/stepper-form/ui/QuestionStep.tsx

**Checkpoint**: User Story 2 complete - all 6 question types render correctly with validation

---

## Phase 5: User Story 3 - Navigate Through Questions (Priority: P2)

**Goal**: Users can go back to previous questions to review/change answers

**Independent Test**: Answer Q1 and Q2 → go back to Q1 → see previous answer → change it → go forward → Q2 answer still preserved

**Acceptance Criteria**:
- Back button appears on question 2+ (FR-010)
- Previous answers are pre-filled when navigating back (FR-011)
- Subsequent answers preserved when navigating forward after modification (FR-011)
- Backward transition animation plays smoothly

### Implementation for User Story 3

- [x] T036 [US3] Add BACK action handling to formReducer in src/widgets/stepper-form/hooks/useStepperForm.ts
- [x] T037 [US3] Add canGoBack computed property to useStepperForm return value in src/widgets/stepper-form/hooks/useStepperForm.ts
- [x] T038 [US3] Create NavigationButtons component with Back/Next/Submit buttons in src/widgets/stepper-form/ui/NavigationButtons.tsx
- [x] T039 [US3] Integrate NavigationButtons into StepperForm, replacing inline button in src/widgets/stepper-form/ui/StepperForm.tsx
- [x] T040 [US3] Add backward transition animation (slide from left) when going back in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T041 [US3] Ensure answers Record preserves all answers during navigation in src/widgets/stepper-form/hooks/useStepperForm.ts
- [x] T042 [US3] Pre-fill input value from answers when returning to previous question in src/widgets/stepper-form/ui/QuestionStep.tsx

**Checkpoint**: User Story 3 complete - full navigation with answer preservation

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements affecting all user stories

- [x] T043 [P] Add aria-live region to ProgressIndicator for screen reader announcements in src/widgets/stepper-form/ui/ProgressIndicator.tsx
- [x] T044 [P] Add keyboard support - Enter key submits current answer in src/widgets/stepper-form/ui/QuestionStep.tsx
- [x] T045 Verify all success criteria per quickstart.md manual testing checklist
- [x] T046 [P] Update shared/ui/index.ts barrel export to include new shadcn components in src/shared/ui/index.ts

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    │
    ▼
Phase 2 (Foundational) ─── BLOCKS ALL USER STORIES
    │
    ├──────────────────────────────────┐
    ▼                                  ▼
Phase 3 (US1: Form Flow)     Phase 4 (US2: Input Types)
    │                                  │
    └────────────┬─────────────────────┘
                 ▼
         Phase 5 (US3: Navigation)
                 │
                 ▼
         Phase 6 (Polish)
```

### User Story Dependencies

- **User Story 1 (P1)**: Requires Foundational → Can start after Phase 2
- **User Story 2 (P1)**: Requires Foundational → Can start after Phase 2 (parallel with US1)
- **User Story 3 (P2)**: Requires US1 and US2 patterns established → Start after Phase 3 and 4

### Within Each User Story

1. Hook/state logic first
2. UI components second
3. Integration with HomePage last (US1 only)

### Parallel Opportunities

**Phase 1** (all can run in parallel):
```
T001, T002, T003, T004 → Install shadcn components simultaneously
```

**Phase 2** (grouped parallel tasks):
```
T007, T008, T009 → Type definitions in parallel
T011, T012, T013 → Validation functions in parallel
T015, T016 → Barrel exports in parallel
```

**Phase 3 & 4** (can run in parallel if different developers):
```
US1: T017-T028 (form flow)
US2: T029-T035 (input types)
```

**Phase 6** (independent polish tasks):
```
T043, T044, T046 → All can run in parallel
```

---

## Parallel Example: Phase 2 Foundational

```bash
# Group 1 - Run these in parallel (type definitions):
Task: "Create Question type definitions in src/widgets/stepper-form/lib/types.ts"
Task: "Create FormState and FormAction type definitions in src/widgets/stepper-form/lib/types.ts"
Task: "Create ValidationResult type in src/widgets/stepper-form/lib/types.ts"

# Group 2 - Run these in parallel (validation functions):
Task: "Implement validatePhone function in src/widgets/stepper-form/lib/validation.ts"
Task: "Implement validateText function in src/widgets/stepper-form/lib/validation.ts"
Task: "Implement validateYesNo function in src/widgets/stepper-form/lib/validation.ts"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup (install components, create directories)
2. Complete Phase 2: Foundational (types, questions, validation)
3. Complete Phase 3: User Story 1 (form flow, progress, transitions)
4. Complete Phase 4: User Story 2 (correct input types)
5. **STOP and VALIDATE**: Manual test per quickstart.md checklist
6. Demo/deploy basic functional form

### Full Feature

7. Complete Phase 5: User Story 3 (back navigation)
8. Complete Phase 6: Polish (accessibility, keyboard support)
9. Final validation against all success criteria

### Suggested MVP Scope

**User Story 1 alone** delivers: Form slides in → questions display one at a time → progress visible → form completes

**User Story 1 + 2** delivers: Full question type support with validation (recommended MVP)

---

## Notes

- Animation timing: Form slide-in 400ms, question transitions 300ms
- All inputs must be controlled components (per constitution)
- Mobile viewport (≤480px) required for testing via DeviceGate
- No persistence - form state resets on page refresh (per spec assumptions)
- Commit after each task or logical group of parallel tasks
