import { IUploadImage } from '@application/interfaces/use-cases/measure/IUploadImage';
import { DoubleReportError } from '@application/errors/DoubleReportError';
import fs from 'fs';
import { MeasureProps } from '@domain/entities/Measure';
import { ServerError } from '@infra/http/errors/ServerError';
import path from 'path';
import { IMeasureRepository } from '@application/interfaces/repositories/IMeasureRepository';
import { ISaveImage } from '@application/interfaces/use-cases/image/ISaveImage';
import {
    base64ToBuffer,
    extractBase64Details,
    extractNumber,
    getCurrentMonthDate,
    getTwoDaysLaterDateTime,
} from '@main/utils/functions';

export class UploadImageImpl implements IUploadImage {
    constructor(
        private readonly MeasureRepository: IMeasureRepository,
        private readonly SaveImage: ISaveImage,
        private readonly getMeasureValueFromImage: (
            filePath: string,
            mimeType: string
        ) => Promise<string>
    ) {}

    async execute(
        reqBody: IUploadImage.Request
    ): Promise<IUploadImage.Response> {
        const reqMeasureDate = new Date(reqBody.measure_datetime);
        const currentMonthDate = getCurrentMonthDate(reqMeasureDate);

        const has_measure =
            await this.MeasureRepository.checkExistenceOfMeasureByMonth(
                reqBody.customer_code,
                currentMonthDate.toISOString(),
                reqMeasureDate.toISOString(),
                reqBody.measure_type
            );

        if (has_measure) {
            return new DoubleReportError();
        }

        try {
            const base64Image = reqBody.image;

            const { mimeType, extension } = extractBase64Details(base64Image);

            const uniqueFileName = `image.${extension}`;
            const filePath = path.join('/tmp', uniqueFileName);

            const buffer_data = base64ToBuffer(base64Image);

            fs.writeFileSync(filePath, buffer_data);

            const iaResponse = await this.getMeasureValueFromImage(
                filePath,
                mimeType
            );
            const measureValue = extractNumber(iaResponse);

            fs.unlinkSync(filePath);

            const saved_img_url = await this.SaveImage.execute({
                buffer_data: buffer_data,
                type: extension,
                expiration_date: new Date(getTwoDaysLaterDateTime()),
            });

            const newMeasure: Omit<MeasureProps, 'measure_uuid'> = {
                customer_code: reqBody.customer_code,
                has_confirmed: false,
                image_url: saved_img_url,
                measure_datetime: reqBody.measure_datetime,
                measure_type: reqBody.measure_type,
                measure_value: measureValue,
            };

            const savedMeasure = await this.MeasureRepository.saveMeasure(
                newMeasure
            );

            const { image_url, measure_value, measure_uuid } = savedMeasure;

            const res: IUploadImage.Response = {
                image_url,
                measure_value,
                measure_uuid,
            };
            return res;
        } catch (error) {
            console.error(error);
            if (error instanceof Error) return error;
            return new ServerError();
        }
    }
}
