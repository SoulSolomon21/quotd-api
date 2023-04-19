import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

const selectQuoteValidator = Prisma.validator<Prisma.QuoteSelect>()({
  id: true,
  text: true,
  Author: {
    select: {
      id: true,
      name: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
});

const createQuoteValidator = (
  text: string,
  author: string,
  category: string,
) => {
  return Prisma.validator<Prisma.QuoteCreateInput>()({
    text,
    Author: {
      connectOrCreate: {
        where: { name: author },
        create: { name: author },
      },
    },
    category: {
      connectOrCreate: {
        where: { name: category },
        create: { name: category },
      },
    },
  });
};
@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuoteDto: CreateQuoteDto) {
    const {
      text,
      author: { name: author },
      category: { name: category },
    } = createQuoteDto;

    return this.prisma.quote.create({
      data: {
        text,
        Author: {
          connectOrCreate: {
            where: { name: author },
            create: { name: author },
          },
        },
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.quote.findMany({
      select: selectQuoteValidator,
    });
  }

  findOne(id: number) {
    return this.prisma.quote.findUnique({
      where: { id },
      select: selectQuoteValidator,
    });
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const {
      text,
      author: { name: author },
      category: { name: category },
    } = updateQuoteDto;

    return this.prisma.quote.update({
      where: { id },
      data: createQuoteValidator(text, author, category),
      select: selectQuoteValidator,
    });
  }

  remove(id: number) {
    return this.prisma.quote.delete({
      where: { id },
    });
  }
}
