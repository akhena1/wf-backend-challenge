import { Request, Response, Router } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { CreatePerson } from '../../../../usecases/createPerson/createPerson';

import { inject } from 'inversify';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Person } from '../../../../entities/person.entity';

@controller('/person')
export class PersonController {
  constructor(
    @inject(CreatePerson) private createPersonUseCase: CreatePerson,
  ) {}

  @httpPost('/create')
  public async createPerson(req: Request, res: Response) {
    const validationError = await this.validateSchema(req.body);
    if (validationError.length > 0) {
      return res.status(400).json({ message: validationError });
    }

    const users = await this.createPersonUseCase.createPerson(req.body);
    return res.json(users);
  }

  private async validateSchema(payload: Person): Promise<string[]> {
    const personObj = plainToClass(Person, payload);
    const schemaValidation = await validate(personObj);
    const errors = schemaValidation.map((item) => item.toString());
    return errors;
  }
}
