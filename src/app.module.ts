import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { Articles } from './entities/article.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchConfig } from './config/search.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ElasticsearchModule.registerAsync({
      useClass: SearchConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Articles]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
