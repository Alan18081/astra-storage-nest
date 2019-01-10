import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { BaseDto } from '@astra/common';

export class CreateStorageDto extends BaseDto {

  @IsInt()
  projectId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  userId: number;

  @IsString()
  @MinLength(4)
  path: string;

}