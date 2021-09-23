import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  constructor(private importCateUC : ImportCategoryUseCase) {

  }
  handle(request: Request, response: Response) : Response {
    const { file } = request;
    this.importCateUC.execute(file);
    return response.send();
  }
}
export { ImportCategoryController };
