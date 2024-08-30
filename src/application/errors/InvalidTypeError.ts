export class InvalidTypeError extends Error {
    constructor(message?: string) {
        super(message ?? 'Tipo inválido');
        this.name = 'INVALID_TYPE';
    }
}