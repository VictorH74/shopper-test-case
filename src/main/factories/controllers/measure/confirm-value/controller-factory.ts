import { BaseController } from '@/infra/http/controllers/BaseController';
import { ConfirmValueController } from '@/infra/http/controllers/measure/ConfirmValueController';
import { makeConfirmValue } from '@/main/factories/use-cases/measure/confirm-value-factory';

export const makeConfirmValueController = (): BaseController => {
    const useCase = makeConfirmValue();
    return new ConfirmValueController(useCase);
};
