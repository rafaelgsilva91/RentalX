import { ISpecificationRepository } from '../../repositories/ISpecificarionRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {

  }

  execute({ name, description }: IRequest) : void {
    const specificationExists = this.specificationRepository.findByName(name);

    if (specificationExists) {
      throw new Error('Specification already exists!!');
    }

    this.specificationRepository.create({
      name, description,
    });
  }
}

export { CreateSpecificationUseCase };
