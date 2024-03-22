import { injectable } from 'inversify';
import { Person } from '../../entities/person.entity';

@injectable()
export class CreatePerson {
  async createPerson(payload: Person) {
    return payload;
  }
}
