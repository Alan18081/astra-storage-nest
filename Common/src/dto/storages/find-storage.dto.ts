import { IsInt, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindStorageDto extends BaseDto {

  @IsInt()
  id: number;

  @IsBoolean()
  @IsOptional()
  includeData?: boolean;

}