import { IsInt, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '@astra/common';

export class UpdateProjectDto extends BaseDto {

  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  storagesCount: number;

}