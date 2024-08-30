import { BaseController } from '@/infra/http/controllers/BaseController';
import { TestController } from '@/infra/http/controllers/TestController';
import { makeTest } from '@/main/factories/use-cases/test-factory';

export const makeTestController = (): BaseController => {
    const useCase = makeTest();
    return new TestController(useCase);
};