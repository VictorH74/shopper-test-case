import { UseCase } from '@/application/interfaces/use-cases/UseCase';

export interface ITestCase
    extends UseCase<ITestCase.Request, ITestCase.Response> {
    execute(reqBody: ITestCase.Request): Promise<ITestCase.Response>;
}

export namespace ITestCase {
    export type Request = { paramValue: string, mandatoryPathVariable: Date, optionalPathVariable?: string };
    export type Response = { paramValue: string, mandatoryPathVariable: Date, optionalPathVariable?: string };
}