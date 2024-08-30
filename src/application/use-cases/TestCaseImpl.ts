import { ITestCase } from '@/application/interfaces/use-cases/ITestCase';

export class TestCaseImpl implements ITestCase {
    async execute(reqBody: ITestCase.Request): Promise<ITestCase.Response> {
        return reqBody;
    }
}