# Contracts: Stepper Form

**Feature Branch**: `003-stepper-form`

## Overview

This directory contains the interface contracts for the stepper form feature. Since this is a frontend-only feature with no backend API, the contracts define TypeScript interfaces for component props, state management, and internal APIs.

## Files

### `component-interfaces.ts`

Contains all TypeScript interfaces and types used across the stepper form widget:

- **Question Types**: `Question`, `YesNoQuestion`, `TextQuestion`, `PhoneQuestion`
- **State Types**: `FormState`, `FormAction`, `ValidationResult`
- **Component Props**: `StepperFormProps`, `QuestionStepProps`, `ProgressIndicatorProps`, `NavigationButtonsProps`
- **Hook Contract**: `UseStepperFormReturn`
- **Validation Contract**: `ValidationUtils`, `Validator`
- **Constants**: `ANIMATION_CONSTANTS`

## Usage

These interfaces should be imported into the implementation files to ensure type safety:

```typescript
import type {
  Question,
  FormState,
  StepperFormProps,
  UseStepperFormReturn,
} from '@/specs/003-stepper-form/contracts/component-interfaces'
```

Or, once implemented, from the widget's public API:

```typescript
import type { StepperFormProps } from '@/widgets/stepper-form'
```

## Versioning

Changes to these contracts should be treated as breaking changes and require updating all dependent components. The contracts serve as the source of truth for the component API design.
