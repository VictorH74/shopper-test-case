import { IDeleteExpiredImages } from "@/application/interfaces/use-cases/image/IDeleteExpiredImages";
import { ImageRepository } from "@/infra/db/postgres/ImageRepository";


export class DeleteExpiredImagesImpl implements IDeleteExpiredImages {
    constructor(
        private readonly ImageRepository: ImageRepository,
    ) { }

    async execute(): Promise<IDeleteExpiredImages.Response> {
        
        await this.ImageRepository.deleteExpiredImages()
    }
}