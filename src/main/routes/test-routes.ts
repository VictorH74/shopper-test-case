import { Router } from 'express';
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter';
import { makeTestController } from '@/main/factories/controllers/test/controller-factory';
import { validate } from '@/main/middlewares/validate'
import { tesDataSchema } from '@/infra/http/validations/test-validation';

export default (router: Router): void => {
  router.get('/test/:paramValue', validate(tesDataSchema, 'INVALID_TYPE'), expressRouteAdapter(makeTestController()))
};