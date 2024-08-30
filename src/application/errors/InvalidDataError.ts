export class InvalidDataError extends Error {
    constructor(message?: string) {
        super(message ?? 'Dados inválido');
        this.name = 'INVALID_DATA';
    }
}