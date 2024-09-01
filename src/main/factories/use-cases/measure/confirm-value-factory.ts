import { IConfirmValue } from '@/application/interfaces/use-cases/measure/IConfirmValue';
import { ConfirmValueImpl } from '@/application/use-cases/measure/ConfirmValueImpl';
import { measureRepositoryInstance } from '@/infra/db/postgres/MeasureRepository';

export const makeConfirmValue = (): IConfirmValue => {
    return new ConfirmValueImpl(measureRepositoryInstance);
};
