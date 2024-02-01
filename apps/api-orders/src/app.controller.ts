import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('prefixo')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('/test')
  getHello(): string {
    return this.service.getHello();
  }

  @Get('/test2')
  getHello2(): string {
    return this.service.getHello();
  }
}
