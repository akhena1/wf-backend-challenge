import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';

import { inject } from 'inversify';
import * as Types from '../../../../types';
import { IUseCase } from '../../../../domain/interfaces/IUseCase';
import { ILogger } from '../../../../domain/interfaces/ILogger';

@controller('/person')
export class PersonController {
  constructor(
    @inject(Types.CreatePersonUseCase)
    private createPersonUseCase: IUseCase,
    @inject(Types.Logger)
    private logger: ILogger,
  ) {}

  @httpPost('/create')
  public async createPerson(req: Request, res: Response) {
    this.logger.info({}, 'POST /create');

    const { message, statusCode, responseData } =
      await this.createPersonUseCase.execute(req.body);

    return res.status(statusCode).json({ message, data: responseData });
  }
}
