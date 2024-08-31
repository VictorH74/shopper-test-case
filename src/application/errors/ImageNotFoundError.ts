export class ImageNotFoundError extends Error {
    constructor() {
        super('Imagem não encontrada');
        this.name = 'Image_NOT_FOUND';
    }
}