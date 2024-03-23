import { DataSource } from 'typeorm';

export interface IDatabaseConnection {
  connect(): Promise<DataSource | void>;
}
