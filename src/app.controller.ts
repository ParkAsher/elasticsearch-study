import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/insert-articles')
  async insertArticles() {
    return this.appService.insertArticles();
  }
}
