import { Request, Response, Router } from 'express';
import { controller, httpPost } from 'inversify-express-utils';

import { inject } from 'inversify';
import * as Types from '../../../../types';
import { IUseCase } from '../../../../domain/interfaces/IUseCase';

@controller('/person')
export class PersonController {
  constructor(
    @inject(Types.CreatePersonUseCase)
    private createPersonUseCase: IUseCase,
  ) {}

  @httpPost('/create')
  public async createPerson(req: Request, res: Response) {
    const { message, statusCode, responseData } =
      await this.createPersonUseCase.execute(req.body);

    return res.status(statusCode).json({ message, data: responseData });
  }
}
