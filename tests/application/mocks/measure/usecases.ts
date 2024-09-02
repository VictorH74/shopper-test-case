import { ISaveImage } from '@application/interfaces/use-cases/image/ISaveImage';
import { makeFakeImage } from '@tests/domain/mocks/entities';

export class SaveImageStub implements ISaveImage {
    async execute(
        _image_data: ISaveImage.Request
    ): Promise<ISaveImage.Response> {
        const { image_uuid, type } = makeFakeImage();

        return `https://example.com/images/${image_uuid}.${type}`;
    }
}
