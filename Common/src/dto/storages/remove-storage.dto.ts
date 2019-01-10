import { IsInt } from 'class-validator';

export class RemoveStorageDto {

  @IsInt()
  id: number;

}