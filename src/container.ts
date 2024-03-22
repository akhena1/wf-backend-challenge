import { Container } from 'inversify';
import { CreatePerson } from './usecases/createPerson/createPerson';
import { PersonController } from './adapters/api/controllers/person/personController';

const container = new Container();
container.bind<PersonController>(PersonController).toSelf();
container.bind<CreatePerson>(CreatePerson).toSelf();

export default container;
