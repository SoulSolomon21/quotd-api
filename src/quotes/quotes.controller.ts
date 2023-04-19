import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import {
  QuoteEntity,
  QuoteWithAuthorAndCategoryEntity,
} from './entities/quote.entity';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  // the @Body decorator is used to capture the request body and use it in our method
  // the request body is recieved as a DTO (data transfer object) which is an object that defines how the data will be sent over the network
  // the DTO is a class named CreateQuoteDto that specifies the structure of the data to be sent
  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @Get()
  findAll(): Promise<QuoteEntity[]> {
    return this.quotesService.findAll();
  }

  // @Get('random')
  // findrandom(): Promise<QuoteEntity> {
  //   return this.quotesService.findRandom()
  // }

  // the @Param decorator is used to capture request parameters and use them in our method
  // in this one, we are recieving a string but turning it to a number using type coercion
  @Get(':id')
  findOne(@Param('id') id: string): Promise<QuoteWithAuthorAndCategoryEntity> {
    return this.quotesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ): Promise<QuoteEntity> {
    return this.quotesService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.quotesService.remove(+id);
  }
}
