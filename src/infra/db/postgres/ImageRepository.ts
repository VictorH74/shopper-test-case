import { IImageRepository } from '@application/interfaces/repositories/IImageRepository';
import { Image } from '@domain/entities/Image';
import { Client } from '@main/config/database';
import { v4 as uuidv4 } from 'uuid';

export class ImageRepository implements IImageRepository {
    async deleteExpiredImages() {
        const currentDate = new Date().toISOString();

        await Client.query('DELETE FROM image WHERE expiration_date < $1', [
            currentDate,
        ]);
    }

    async saveImage(image_data: IImageRepository.SaveImageRequest) {
        const { buffer_data, type, expiration_date } = image_data;

        const queryText = `INSERT INTO 
        image (image_uuid, buffer_data, type, expiration_date)
         VALUES ($1, $2, $3, $4) RETURNING *`;

        const res = await Client.query<Image>(queryText, [
            uuidv4(),
            buffer_data,
            type,
            expiration_date,
        ]);

        return res.rows[0];
    }

    async getImageById(image_uuid: IImageRepository.GetImageByIdRequest) {
        const queryText = `SELECT * FROM image WHERE image_uuid = $1`;
        const res = await Client.query<Image>(queryText, [image_uuid]);

        if (res.rowCount == 0) return null;

        return res.rows[0];
    }
}

export const imageRepositoryInstance = new ImageRepository();
