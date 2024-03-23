import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { AddressEntity } from './entities/address.entity';

import { injectable } from 'inversify';

@injectable()
class DBConnectionManager {
  async connect() {
    try {
      return new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'senha_root_123',
        database: 'wefit',
        synchronize: true,
        logging: true,
        entities: [PersonEntity, AddressEntity],
        subscribers: [],
        migrations: [],
      }).initialize();
    } catch (error) {
      console.error('Error during Data Source initialization', error);
    }
  }
}

export { DBConnectionManager };
