import { QuoteEntity } from 'src/quotes/entities/quote.entity';

export class AuthorEntity {
  id: number;
  name: string;
}

export class AuthorWithQuotesEntity {
  id: number;
  name: string;
  quotes: QuoteEntity[];
}
