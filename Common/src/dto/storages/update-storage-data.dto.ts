import { IsInt, IsDefined } from 'class-validator';

export class UpdateStorageDataDto {

  @IsInt()
  id: number;

  @IsDefined()
  data: string;

}