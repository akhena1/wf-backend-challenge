export interface ILogger {
  info(subject: object, message: string): void;
  error(subject: object, message: string): void;
}
