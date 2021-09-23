import csvParse from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory{
    name:string;
    description:string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository:ICategoriesRepository) {}

  loadCategories(file:Express.Multer.File):Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // Recebe o arquivo e cria o stream
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      // Cria uma instância do csv parse
      const parseFile = csvParse();
      // Repassa cada parte para o parseFile
      stream.pipe(parseFile);
      parseFile.on('data', async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description,
        });
      }).on('end', () => {
        fs.promises.unlink(file.path);
        resolve(categories);
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async execute(file: Express.Multer.File):Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}
export { ImportCategoryUseCase };
