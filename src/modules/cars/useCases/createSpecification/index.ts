import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationRepository = new SpecificationRepository();
const createSpecUseCase = new CreateSpecificationUseCase(specificationRepository);
const createSpecController = new CreateSpecificationController(createSpecUseCase);

export { createSpecController };
