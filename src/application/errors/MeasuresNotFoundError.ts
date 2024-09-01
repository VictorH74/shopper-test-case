export class MeasuresNotFoundError extends Error {
    constructor() {
        super('Nenhuma leitura encontrada');
        this.name = 'MEASURES_NOT_FOUND';
    }
}
