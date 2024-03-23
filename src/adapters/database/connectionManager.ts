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
        host: process.env.MYSQLDB_HOST,
        port: Number(process.env.MYSQLDB_PORT) || 3306,
        username: process.env.MYSQLDB_USERNAME,
        password: process.env.MYSQLDB_PASSWORD,
        database: process.env.MYSQLDB_NAME,
        synchronize: true,
        logging: ['error', 'warn'],
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
