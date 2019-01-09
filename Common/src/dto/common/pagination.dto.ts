import { IsInt, IsOptional } from 'class-validator';

export abstract class PaginationDto {

  @IsInt()
  @IsOptional()
  page?: number;

  @IsInt()
  @IsOptional()
  limit?: number;

}