import { injectable } from 'inversify';
import logger from 'pino';

@injectable()
export class Logger {
  info(subject: object, message: string): void {
    logger().info(subject, message);
  }

  error(subject: object, message: string): void {
    logger().error(subject, message);
  }
}
