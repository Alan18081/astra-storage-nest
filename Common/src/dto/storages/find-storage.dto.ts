import { IsInt, IsOptional, IsBoolean } from 'class-validator';

export class FindStorageDto {

  @IsInt()
  id: number;

  @IsBoolean()
  @IsOptional()
  includeData?: boolean;

}