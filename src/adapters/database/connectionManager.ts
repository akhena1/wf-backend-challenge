import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PersonEntity } from './entities/person.entity';

import { inject, injectable } from 'inversify';
import { IDatabaseConnection } from '../../domain/interfaces/IDatabaseConnection';
import * as Types from '../../types';
import { ILogger } from '../../domain/interfaces/ILogger';

@injectable()
export class DBConnectionManager implements IDatabaseConnection {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
  ) {}

  async initialize(): Promise<DataSource | void> {
    try {
      this.logger.info({}, 'Initializing MySql Database Connection');
      return new DataSource({
        type: 'mysql',
        host: process.env.MYSQLDB_HOST,
        port: Number(process.env.MYSQLDB_PORT) || 3306,
        username: process.env.MYSQLDB_USERNAME,
        password: process.env.MYSQLDB_PASSWORD,
        database: process.env.MYSQLDB_NAME,
        synchronize: true,
        logging: ['error', 'warn'],
        entities: [PersonEntity],
        subscribers: [],
        migrations: [],
      }).initialize();
    } catch (error) {
      this.logger.error({ error }, 'Error during Data Source initialization');
    }
  }
}
