# custom-error

## Overview

Provides a base error class for creating and identifying custom errors.

## How to Use

### Base Usage

```typescript
import { CustomError } from "custom-error";

function doSomethingRisky() {
  // Throw a CustomError when something goes wrong
  throw new CustomError("An error has occurred");
}

try {
  doSomethingRisky();
} catch (err) {
  if (CustomError.is(err)) {
    // Safely handle CustomError instances
    console.error(`CustomError: ${err.message}`);
    console.error(`type: ${err.type}`);
  } else {
    // Handle other errors
    console.error("Unknown error:", err);
  }
}
```

### Extending for Project-Specific Errors

To define project-specific errors, extend the `CustomError` class. The example below shows a validation error implementation.

```typescript
import { CustomError } from "custom-error";

export class ValidationError extends CustomError {
  // Set a custom error name
  static readonly NAME = "ValidationError";
  readonly type = ValidationError.NAME;

  // Add extra properties as needed
  constructor(
    message: string,
    public readonly field: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  // Override the type guard if needed
  static is(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
  }
}
```

```typescript
try {
  // Example form validation
  throw new ValidationError("Invalid value provided", "email");
} catch (err) {
  if (ValidationError.is(err)) {
    console.warn(`Field: ${err.field} — ${err.message}`);
  } else if (CustomError.is(err)) {
    console.error(`[CustomError] ${err.message}`);
  } else {
    console.error("Unknown error:", err);
  }
}
```

## API

### `class CustomError extends Error`

- `static readonly NAME: string`
  Default error name (`"CustomError"`).

- `readonly type: string`
  Instance property holding the same value as `NAME`.

- `constructor(message: string)`
  Accepts an error message, just like the standard `Error` constructor.

- `static is(error: unknown): error is CustomError`
  Type guard that checks whether the given value is an instance of `CustomError`.

```typescript
// Example usage of the type guard:
if (CustomError.is(err)) {
  // err is treated as CustomError here
}
```
