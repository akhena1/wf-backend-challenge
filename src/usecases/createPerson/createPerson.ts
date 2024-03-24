import { inject, injectable } from 'inversify';
import { PersonEntity } from '../../adapters/database/entities/person.entity';
import * as Types from '../../types';
import { plainToClass } from 'class-transformer';
import { Person } from '../../domain/entities/person';
import { HttpResponseResult } from '../../domain/http/httpResponseResult';
import { HttpStatusCode } from '../../domain/enums/httpStatusCode';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { IDatabaseConnection } from '../../domain/interfaces/IDatabaseConnection';
import { PersonType } from '../../domain/enums/personType';

@injectable()
export class CreatePersonUseCase {
  constructor(
    @inject(Types.DBConnectionManager) private dataSource: IDatabaseConnection,
  ) {}

  async execute(payload: Partial<Person>): Promise<HttpResponseResult> {
    try {
      const person = plainToClass(Person, payload);

      const validationError = await person.validateSchema();

      if (validationError.length > 0) {
        return new HttpResponseResult(
          `Invalid Fields`,
          HttpStatusCode.BAD_REQUEST_ERROR,
          { errors: validationError },
        );
      }

      if (person.cnpj && !cnpj.isValid(person.cnpj)) {
        return new HttpResponseResult(
          `Invalid CNPJ`,
          HttpStatusCode.BAD_REQUEST_ERROR,
        );
      }

      if (!cpf.isValid(person.cpf)) {
        return new HttpResponseResult(
          `Invalid CPF`,
          HttpStatusCode.BAD_REQUEST_ERROR,
        );
      }

      if (person.personType === PersonType.LEGAL_PERSON && !person.cnpj) {
        return new HttpResponseResult(
          `Legal type of person should have CNPJ`,
          HttpStatusCode.BAD_REQUEST_ERROR,
        );
      }

      if (person.personType === PersonType.NATURAL_PERSON && person.cnpj) {
        return new HttpResponseResult(
          `Natural Person should not have a CNPJ`,
          HttpStatusCode.BAD_REQUEST_ERROR,
        );
      }

      const dataSource = await this.dataSource.initialize();

      const personExists = await dataSource?.manager.find(PersonEntity, {
        where: {
          cpf: person.cpf,
          personType: person.personType,
        },
      });

      if (personExists && personExists.length > 0) {
        return new HttpResponseResult(
          `Person Already Exists`,
          HttpStatusCode.CONFLICT,
        );
      }

      await dataSource?.manager.save(PersonEntity, person);

      return new HttpResponseResult(`Created`, HttpStatusCode.CREATED);
    } catch (error) {
      console.log(error);

      return new HttpResponseResult(
        `Internal Error: ${error}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
