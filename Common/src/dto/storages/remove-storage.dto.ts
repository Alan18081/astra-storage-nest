import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class RemoveStorageDto extends BaseDto {

  @IsInt()
  id: number;

}