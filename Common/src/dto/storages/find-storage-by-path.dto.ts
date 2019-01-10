import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindStorageByPathDto extends BaseDto {

  @IsString()
  path: string;

  @IsBoolean()
  @IsOptional()
  includeData?: boolean;

}