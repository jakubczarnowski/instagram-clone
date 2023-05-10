class ValidationError extends Error {
  readonly actualValue: unknown;

  constructor(actualValue: unknown, message: string) {
    super(message);
    this.name = "ValidationError";
    this.actualValue = actualValue;
  }
}
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new ValidationError(condition, message);
  }
}
