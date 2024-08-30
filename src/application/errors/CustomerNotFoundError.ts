export class CustomerNotFoundError extends Error {
  constructor() {
    super('The customer was not found');
    this.name = 'CustomerNotFoundError';
  }
}