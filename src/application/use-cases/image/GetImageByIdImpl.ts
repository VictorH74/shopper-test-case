import { ImageNotFoundError } from "@/application/errors/ImageNotFoundError";
import { InvalidImageExtensionError } from "@/application/errors/InvalidImageExtensionError";
import { IGetImageById } from "@/application/interfaces/use-cases/image/IGetImageById";
import { ImageRepository } from "@/infra/db/postgres/ImageRepository";


export class GetImageByIdImpl implements IGetImageById {
    constructor(
        private readonly ImageRepository: ImageRepository,
    ) { }

    async execute({ image_uuid, image_type }: IGetImageById.Request): Promise<IGetImageById.Response> {

        const imageBlob = await this.ImageRepository.getImageById(image_uuid)

        if (!imageBlob) return new ImageNotFoundError();

        if (imageBlob.type != image_type) return new InvalidImageExtensionError();

        return imageBlob;
    }
}