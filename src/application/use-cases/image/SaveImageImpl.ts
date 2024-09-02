import { IImageRepository } from '@application/interfaces/repositories/IImageRepository';
import { ISaveImage } from '@application/interfaces/use-cases/image/ISaveImage';
import { env } from '@main/config/env';

export class SaveImageImpl implements ISaveImage {
    constructor(private readonly ImageRepository: IImageRepository) {}

    async execute(
        image_data: ISaveImage.Request
    ): Promise<ISaveImage.Response> {
        const { image_uuid, type } = await this.ImageRepository.saveImage(
            image_data
        );

        return `${env.BASE_URL}/images/${image_uuid}.${type}`;
    }
}
