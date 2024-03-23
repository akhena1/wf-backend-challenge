import { inject, injectable } from 'inversify';
import { PersonEntity } from '../../adapters/database/entities/person.entity';
import * as Types from '../../types';
import { DBConnectionManager } from '../../adapters/database/connectionManager';
import { plainToClass } from 'class-transformer';
import { Person } from '../../domain/entities/person';
import { HttpResponseResult } from '../../domain/http/httpResponseResult';
import { HttpStatusCode } from '../../domain/enums/httpStatusCode';
import { cnpj, cpf } from 'cpf-cnpj-validator';

@injectable()
export class CreatePersonUseCase {
  constructor(
    @inject(Types.DBConnectionManager) private dataSource: DBConnectionManager,
  ) {}

  async createPerson(payload: Person): Promise<HttpResponseResult> {
    try {
      const personObj = plainToClass(Person, payload);

      if (personObj.cnpj && !cnpj.isValid(personObj.cnpj)) {
        return new HttpResponseResult(
          `Invalid CNPJ`,
          HttpStatusCode.BAD_REQUEST_ERROR,
        );
      }

      if (!cpf.isValid(personObj.cpf)) {
        return new HttpResponseResult(
          `Invalid CPF`,
          HttpStatusCode.BAD_REQUEST_ERROR,
        );
      }

      const validationError = await personObj.validateSchema();

      if (validationError.length > 0) {
        return new HttpResponseResult(
          `Invalid Schema: ${validationError}`,
          HttpStatusCode.BAD_REQUEST_ERROR,
        );
      }

      const personEntity = plainToClass(PersonEntity, personObj);
      const db = await this.dataSource.connect();
      const response = await db?.manager.save(PersonEntity, personEntity);

      return new HttpResponseResult(
        `Created`,
        HttpStatusCode.CREATED,
        response,
      );
    } catch (error) {
      console.log(error);

      return new HttpResponseResult(
        `Internal Error: ${error}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
