import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class RemoveProjectDto extends BaseDto {

  @IsInt()
  id: number;

}