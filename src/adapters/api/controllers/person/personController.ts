import { Request, Response, Router } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { CreatePersonUseCase } from '../../../../usecases/createPerson/createPerson';

import { inject } from 'inversify';
import * as Types from '../../../../types';

@controller('/person')
export class PersonController {
  constructor(
    @inject(Types.CreatePersonUseCase)
    private createPersonUseCase: CreatePersonUseCase,
  ) {}

  @httpPost('/create')
  public async createPerson(req: Request, res: Response) {
    const { message, statusCode, responseData } =
      await this.createPersonUseCase.createPerson(req.body);

    return res.status(statusCode).json({ message, data: responseData });
  }
}
