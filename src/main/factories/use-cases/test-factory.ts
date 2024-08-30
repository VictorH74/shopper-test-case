import { ITestCase } from '@/application/interfaces/use-cases/ITestCase';
import { TestCaseImpl } from '@/application/use-cases/TestCaseImpl';

export const makeTest = (): ITestCase => {
    return new TestCaseImpl();
};