import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  // we need the @ValidateNested() decorator and the @Type() decorator so that we can include both author and category information in a Post request to quotes
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAuthorDto)
  readonly author: CreateAuthorDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateCategoryDto)
  readonly category: CreateCategoryDto;
}
