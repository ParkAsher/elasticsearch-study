import { Controller, Get, Query, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/insert-articles')
  async insertArticles() {
    return this.appService.insertArticles();
  }

  @Get('/')
  @Render('index')
  index() {
    return;
  }

  @Get('/search')
  async searchArticle(@Query('text') searchText: string) {
    return this.appService.searchArticles(searchText);
  }
}
