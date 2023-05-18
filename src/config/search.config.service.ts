import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from '@nestjs/elasticsearch';

@Injectable()
export class SearchConfig implements ElasticsearchOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.configService.get<string>('ELASTIC_ID'),
      auth: {
        username: this.configService.get<string>('ELASTIC_USERNAME'),
        password: this.configService.get<string>('ELASTIC_PASSWORD'),
      },
    };
  }
}
