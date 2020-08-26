/**
 * Generic Error object been thrown inside any of the components
 */
export class UserError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UserError';
  }
}
