import { LogErrorRepository } from '../../data/protocols';
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    console.log('LogControllerDecorator ->', __dirname);
    if (httpResponse.statusCode === 500) {
      const { error } = httpResponse.body;

      await this.logErrorRepository.logError(error);
    }

    return httpResponse;
  }
}
