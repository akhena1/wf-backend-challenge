import { HttpResponseResult } from '../http/httpResponseResult';

export interface IUseCase {
  execute(params?: object): Promise<HttpResponseResult>;
}
