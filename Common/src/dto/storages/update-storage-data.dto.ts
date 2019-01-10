import { IsInt, IsDefined } from 'class-validator';
import { BaseDto } from '@astra/common';

export class UpdateStorageDataDto extends BaseDto {

  @IsInt()
  id: number;

  @IsDefined()
  data: string;

}