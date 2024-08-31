import { ConfirmationDuplicateError } from '@/application/errors/ConfirmationDuplicateError';
import { InvalidDataError } from '@/application/errors/InvalidDataError';
import { MeasureNotFoundError } from '@/application/errors/MeasureNotFoundError';
import { UseCase } from '@/application/interfaces/use-cases/UseCase';

export interface IConfirmValue
    extends UseCase<IConfirmValue.Request, IConfirmValue.Response> {
    execute(reqBody: IConfirmValue.Request): Promise<IConfirmValue.Response>;
}

export namespace IConfirmValue {
    export type Request = {
        measure_uuid: string,
        confirmed_value: number
    }
    export type Response = {
        success: true,
    }
    | InvalidDataError
    | MeasureNotFoundError
    | ConfirmationDuplicateError;
}