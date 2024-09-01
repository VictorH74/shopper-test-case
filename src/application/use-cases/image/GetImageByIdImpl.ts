import { ImageNotFoundError } from "@/application/errors/ImageNotFoundError";
import { InvalidImageExtensionError } from "@/application/errors/InvalidImageExtensionError";
import { IImageRepository } from "@/application/interfaces/repositories/IImageRepository";
import { IGetImageById } from "@/application/interfaces/use-cases/image/IGetImageById";


export class GetImageByIdImpl implements IGetImageById {
    constructor(
        private readonly ImageRepository: IImageRepository,
    ) { }

    async execute({ image_uuid, image_type }: IGetImageById.Request): Promise<IGetImageById.Response> {

        const imageBlob = await this.ImageRepository.getImageById(image_uuid)

        if (!imageBlob) return new ImageNotFoundError();

        if (imageBlob.type != image_type) return new InvalidImageExtensionError();

        return imageBlob;
    }
}