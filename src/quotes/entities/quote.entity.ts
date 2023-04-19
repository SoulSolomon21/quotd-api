import { AuthorEntity } from 'src/authors/entities/author.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';

export class QuoteEntity {
  id: number;
  text: string;
}

export class QuoteWithAuthorEntity {
  id: number;
  text: string;

  Author: AuthorEntity;
}

export class QuoteWithAuthorAndCategoryEntity {
  id: number;
  text: string;

  Author: AuthorEntity;
  category: CategoryEntity;
}
