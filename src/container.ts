import { Container } from 'inversify';
import { CreatePersonUseCase } from './usecases/createPerson/createPerson';
import { PersonController } from './adapters/api/controllers/person/personController';
import * as Types from './types';
import { DBConnectionManager } from './adapters/database/connectionManager';
import { Logger } from './adapters/logger/logger';

const container = new Container();

// Controllers
container.bind<PersonController>(Types.PersonController).to(PersonController);

// UseCases
container
  .bind<CreatePersonUseCase>(Types.CreatePersonUseCase)
  .to(CreatePersonUseCase);

// Config
container
  .bind<DBConnectionManager>(Types.DBConnectionManager)
  .to(DBConnectionManager);
container.bind<Logger>(Types.Logger).to(Logger);

export default container;
