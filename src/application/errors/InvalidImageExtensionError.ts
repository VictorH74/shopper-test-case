export class InvalidImageExtensionError extends Error {
    constructor() {
        super('A extenção fornecida como parâmetro é incompatível com a imagem do id fornecido');
        this.name = 'INVALID_IMAGE_EXTENSION';
    }
}