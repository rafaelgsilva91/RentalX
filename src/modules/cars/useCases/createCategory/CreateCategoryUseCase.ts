import { CategoryRepository } from '../../repositories/implementations/CategoriesRepository';

interface IRequest{
    name:string;
    description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoryRepository) {

  }

  execute({ description, name }: IRequest) :void {
    const categoryExists = this.categoriesRepository.findByName(name);
    if (categoryExists) {
      throw new Error('Category already exists!!');
    }

    this.categoriesRepository.create({ name, description });
  }
}
export { CreateCategoryUseCase };
