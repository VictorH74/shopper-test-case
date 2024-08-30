export class ConfirmationDuplicateError extends Error {
    constructor() {
        super('Leitura já confirmada');
        this.name = 'CONFIRMATION_DUPLICATE';
    }
}