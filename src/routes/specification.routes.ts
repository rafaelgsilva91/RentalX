import { Router } from 'express';

import { createSpecController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => createSpecController.handle(request, response));

/* categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list();
  return response.json(all);
}); */

export { specificationsRoutes };
