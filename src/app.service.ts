import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Articles } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Articles) private articleRepository: Repository<Articles>,
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
}
