import { Request, Response, Router } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { CreatePersonUseCase } from '../../../../usecases/createPerson/createPerson';

import { inject } from 'inversify';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Person } from '../../../../entities/person';
import * as Types from '../../../../types';
@controller('/person')
export class PersonController {
  constructor(
    @inject(Types.CreatePersonUseCase)
    private createPersonUseCase: CreatePersonUseCase,
  ) {}

  @httpPost('/create')
  public async createPerson(req: Request, res: Response) {
    const personObj = plainToClass(Person, req.body);
    const validationError = await this.validateSchema(personObj);

    if (validationError.length > 0) {
      return res.status(400).json({ message: validationError });
    }

    const users = await this.createPersonUseCase.createPerson(personObj);
    return res.json(users);
  }

  private async validateSchema(payload: Person): Promise<string[]> {
    const schemaValidation = await validate(payload);
    const errors = schemaValidation.map((item) => item.toString());
    return errors;
  }
}
