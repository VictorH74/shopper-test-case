import { ImageNotFoundError } from "@/application/errors/ImageNotFoundError";
import { IGetImageById } from "@/application/interfaces/use-cases/image/IGetImageById";
import { ImageRepository } from "@/infra/db/postgres/ImageRepository";


export class GetImageByIdImpl implements IGetImageById {
    constructor(
        private readonly ImageRepository: ImageRepository,
    ) { }

    async execute(img_id: IGetImageById.Request): Promise<IGetImageById.Response> {
        
        const imageBlob = await this.ImageRepository.getImageById(img_id)
        
        if (!imageBlob) return new ImageNotFoundError();

        return imageBlob;
    }
}