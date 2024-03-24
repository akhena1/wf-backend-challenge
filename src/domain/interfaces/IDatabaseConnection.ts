import { DataSource } from 'typeorm';

export interface IDatabaseConnection {
  initialize(): Promise<DataSource | void>;
}
