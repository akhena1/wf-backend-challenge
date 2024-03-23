import { inject, injectable } from 'inversify';
import { PersonEntity } from '../../adapters/database/entities/person.entity';
import * as Types from '../../types';
import { DBConnectionManager } from '../../adapters/database/connectionManager';
import { plainToClass } from 'class-transformer';
import { Person } from '../../entities/person';

@injectable()
export class CreatePersonUseCase {
  constructor(
    @inject(Types.DBConnectionManager) private dataSource: DBConnectionManager,
  ) {}

  async createPerson(payload: Person) {
    try {
      const data = plainToClass(PersonEntity, payload);

      const db = await this.dataSource.connect();
      const response = await db?.manager.save(PersonEntity, data);
      console.log('PAYLOAD  ==========>', response);
      return { message: response };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
