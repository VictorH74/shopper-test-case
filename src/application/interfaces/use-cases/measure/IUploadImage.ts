import { DoubleReportError } from '@/application/errors/DoubleReportError';
import { InvalidDataError } from '@/application/errors/InvalidDataError';
import { UseCase } from '@/application/interfaces/use-cases/UseCase';
import { MeasureType } from '@/domain/entities/Measure';

export interface IUploadImage
  extends UseCase<IUploadImage.Request, IUploadImage.Response> {
  execute(reqBody: IUploadImage.Request): Promise<IUploadImage.Response>;
}

export namespace IUploadImage {
  export type Request = {
    image: string,
    customer_code: string,
    measure_datetime: Date,
    measure_type: MeasureType
  };
  export type Response = {
    image_url: string,
    measure_value: number,
    measure_uuid: string
  }
    | DoubleReportError
    | InvalidDataError
    | Error;
}