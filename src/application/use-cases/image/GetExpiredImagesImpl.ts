import { IGetExpiredImages } from "@/application/interfaces/use-cases/image/IGetExpiredImages";
import { ImageRepository } from "@/infra/db/postgres/ImageRepository";


export class GetExpiredImagesImpl implements IGetExpiredImages {
    constructor(
        private readonly ImageRepository: ImageRepository,
    ) { }

    async execute(): Promise<IGetExpiredImages.Response> {
        
        return this.ImageRepository.getExpiredImages()
    }
}