# Feature Specification: Stepper Form with Quiz Questions

**Feature Branch**: `003-stepper-form`
**Created**: 2026-01-08
**Status**: Draft
**Input**: User description: "After the user visits the home page and the logo animation is finished, we want to animate a stepper form sliding in from the bottom of the screen. The form should display one question at a time and show progress of how many questions are remaining."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete the Stepper Form (Priority: P1)

A visitor arrives at the home page and watches the logo animation. Once the animation completes, a stepper form slides in from the bottom of the screen. The user answers each question one at a time, seeing their progress through the form. After answering the final question (phone number), the form submission is complete.

**Why this priority**: This is the core user journey - without this flow, the feature has no value. Users must be able to progress through all questions and complete the form.

**Independent Test**: Can be fully tested by visiting the home page, waiting for the logo animation to complete, and then answering all 6 questions in sequence. Delivers value by collecting user responses.

**Acceptance Scenarios**:

1. **Given** the home page is loaded and logo animation has completed, **When** the animation finishes, **Then** the stepper form slides in smoothly from the bottom of the screen
2. **Given** the stepper form is displayed, **When** the user views the form, **Then** they see only one question at a time
3. **Given** the user is viewing a question, **When** they look at the form, **Then** they see progress indicating how many questions remain (e.g., "2 of 6")
4. **Given** the user has answered a question, **When** they submit their answer, **Then** the form transitions to the next question with a smooth animation
5. **Given** the user is on the final question (phone number), **When** they submit their answer, **Then** the form indicates completion

---

### User Story 2 - Answer Each Question Type (Priority: P1)

Users encounter different question types throughout the form. Each question has an appropriate input method for the type of answer expected.

**Why this priority**: Users must be able to provide answers in the appropriate format for each question type. This is critical for data collection.

**Independent Test**: Can be tested by navigating to each question and verifying the appropriate input method is available.

**Acceptance Scenarios**:

1. **Given** the user is on "Do you eat meat?", **When** they view the question, **Then** they can select from Yes/No options
2. **Given** the user is on the drinks question, **When** they view the question, **Then** they can enter a number or select from options
3. **Given** the user is on the Clark Griswold question, **When** they view the question, **Then** they can enter a text answer
4. **Given** the user is on the Get Out question, **When** they view the question, **Then** they can enter a text answer
5. **Given** the user is on the nickname question, **When** they view the question, **Then** they can enter their nickname as text
6. **Given** the user is on the phone number question, **When** they view the question, **Then** they can enter a phone number with appropriate formatting

---

### User Story 3 - Navigate Through Questions (Priority: P2)

Users can navigate backward to review or change their previous answers before final submission.

**Why this priority**: While forward progression is essential (P1), the ability to go back and change answers improves user experience and data quality but is not strictly required for MVP.

**Independent Test**: Can be tested by answering questions, then using back navigation to return to previous questions and modify answers.

**Acceptance Scenarios**:

1. **Given** the user is on question 2 or later, **When** they want to change a previous answer, **Then** they can navigate back to previous questions
2. **Given** the user has navigated back to a previous question, **When** they view that question, **Then** their previous answer is pre-filled
3. **Given** the user has modified a previous answer, **When** they continue forward, **Then** subsequent answers are preserved

---

### Edge Cases

- What happens if the user tries to proceed without answering a question? (Form should require an answer before advancing)
- What happens if the user enters an invalid phone number format? (Display validation error with guidance)
- What happens if the user refreshes the page mid-form? (Progress is lost, user starts from beginning after logo animation)
- What happens if the logo animation hasn't completed but user interacts with the page? (Form remains hidden until animation completes)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the stepper form only after the logo animation has completed
- **FR-002**: System MUST animate the form sliding in from the bottom of the screen
- **FR-003**: System MUST display exactly one question at a time
- **FR-004**: System MUST show progress indicator displaying current question number and total (e.g., "2 of 6")
- **FR-005**: System MUST display questions in the specified order:
  1. "Do you eat meat?"
  2. "When going out, how many drinks is a good time?"
  3. "When Clark Griswold gets accidentally locked in the basement while hiding presents, what power tool does he use to cut a hole in the door to escape?"
  4. "In the movie Get Out, what is the place called when someone gets hypnotized?"
  5. "What is your nickname?"
  6. "Enter phone number"
- **FR-006**: System MUST animate transitions between questions smoothly
- **FR-007**: System MUST validate that each question has an answer before allowing progression
- **FR-008**: System MUST provide appropriate input types for each question (Yes/No for meat question, text input for trivia/nickname, phone input for phone number)
- **FR-009**: System MUST validate phone number format before accepting final submission
- **FR-010**: System MUST allow users to navigate back to previous questions
- **FR-011**: System MUST preserve answers when navigating between questions
- **FR-012**: System MUST indicate form completion after the final question is submitted

### Key Entities

- **Question**: Represents a single step in the form - contains question text, question type (yes/no, text, number, phone), position in sequence, and validation rules
- **Form Progress**: Tracks the user's current position in the form and their answers to each question
- **User Response**: The answer provided by the user for each question

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Form slide-in animation begins within 500ms of logo animation completion
- **SC-002**: 100% of users see all 6 questions in the correct order
- **SC-003**: Users can complete the entire form in under 2 minutes
- **SC-004**: Form transitions between questions feel smooth (animation completes within 300ms)
- **SC-005**: All submitted phone numbers pass format validation
- **SC-006**: Progress indicator accurately reflects the user's position at all times

## Assumptions

- The logo animation completion event is detectable/hookable from the existing home page implementation
- Phone number validation will accept common formats (with or without country code, dashes, parentheses)
- Form data persistence beyond the current session is out of scope (no backend storage required for MVP)
- The form will be styled consistently with the existing home page design
- Questions are displayed in English only
