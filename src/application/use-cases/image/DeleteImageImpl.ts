import { IDeleteImage } from "@/application/interfaces/use-cases/image/IDeleteImage";
import { ImageRepository } from "@/infra/db/postgres/ImageRepository";


export class DeleteImageImpl implements IDeleteImage {
    constructor(
        private readonly ImageRepository: ImageRepository,
    ) { }

    async execute(img_id: IDeleteImage.Request): Promise<IDeleteImage.Response> {
        
        await this.ImageRepository.deleteImage(img_id)
    }
}