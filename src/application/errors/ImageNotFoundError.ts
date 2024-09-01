export class ImageNotFoundError extends Error {
    constructor() {
        super('Imagem não encontrada ou foi expirada');
        this.name = 'IMAGE_NOT_FOUND';
    }
}
