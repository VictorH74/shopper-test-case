import { DeleteExpiredImagesRepository } from "@/application/interfaces/repositories/image/DeleteExpiredImagesRepository";
import { GetImageByIdRepository } from "@/application/interfaces/repositories/image/GetImageByIdRepository";
import { SaveImageRepository } from "@/application/interfaces/repositories/image/SaveImageRepository";
import { Image } from "@/domain/entities/Image";
import { Client } from "@/main/config/database";

export class ImageRepository implements GetImageByIdRepository, DeleteExpiredImagesRepository, SaveImageRepository {

    async deleteExpiredImages(): Promise<DeleteExpiredImagesRepository.Response> {
        const currentDate = new Date().toISOString()

        await Client.query('DELETE FROM image WHERE expiration_date < $1', [currentDate])
    }

    async saveImage(image_data: SaveImageRepository.Request): Promise<SaveImageRepository.Response> {
        const { buffer_data, image_uuid, type, expiration_date } = image_data;

        const queryText = `INSERT INTO 
        image (image_uuid, buffer_data, type, expiration_date)
         VALUES ($1, $2, $3, $4) RETURNING *`

        const res = await Client.query<Image>(
            queryText,
            [image_uuid, buffer_data, type, expiration_date])

        return res.rows[0]
    }

    async getImageById(image_uuid: GetImageByIdRepository.Request): Promise<GetImageByIdRepository.Response> {
        const queryText = `SELECT * FROM image WHERE image_uuid = $1`
        const res = await Client.query<Image>(queryText, [image_uuid])

        if (res.rowCount == 0) return null;

        return res.rows[0];
    }
}

export const imageRepositoryInstance = new ImageRepository()

