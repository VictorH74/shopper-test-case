import { IConfirmValue } from '@/application/interfaces/use-cases/measure/IConfirmValue';
import { ConfirmValueImpl } from '@/application/use-cases/measure/ConfirmValueImpl';
import { MeasureRepository } from '@/infra/db/prismaOrm/repositories/MeasureRepository';

export const makeConfirmValue = (): IConfirmValue => {
  const measureRepository = new MeasureRepository();
  return new ConfirmValueImpl(measureRepository);
};