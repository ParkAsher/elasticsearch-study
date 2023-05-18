import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entities/article.entity';
import { Repository } from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Articles) private articleRepository: Repository<Articles>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async insertArticles() {
    const contentArray = ['이것은', '엘라스틱', '서치', '테스트', '입니다.'];
    const categoryArray = ['카', '테', '고', '리'];

    try {
      for (let i = 0; i < 100000; i++) {
        console.log(`게시글 번호 : ${i + 1}`);

        await this.articleRepository.save({
          title: `게시글 ${i + 1}번 입니다.`,
          author: Math.random().toString(36).substring(2, 11),
          content: contentArray[Math.floor(Math.random() * 5)],
          category: categoryArray[Math.floor(Math.random() * 4)],
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getArticles() {
    try {
      return await this.articleRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async searchArticles(searchText: string) {
    const query = `select * 
                    from articles
                    where title like '%${searchText}%'
                    or author like '%${searchText}%'
                    or content like '%${searchText}%'
                    or category like '%${searchText}%'`;

    try {
      return this.articleRepository.query(query);
    } catch (error) {
      throw error;
    }
  }

  async createDocument() {
    try {
      const articles = await this.getArticles();

      console.log('인덱스 시작');

      for (const article of articles) {
        await this.elasticsearchService.index({
          index: 'articles',
          body: article,
        });
      }

      return;
    } catch (error) {
      throw error;
    }
  }

  async elasticsearchArticles(searchText: string) {
    try {
      const articles = await this.elasticsearchService.search({
        index: 'articles',
        query: {
          query_string: {
            query: `*${searchText}*`,
            fields: ['title', 'author', 'content', 'category'],
          },
        },
        size: 10000,
      });
      return articles.hits;
    } catch (error) {
      throw error;
    }
  }
}
