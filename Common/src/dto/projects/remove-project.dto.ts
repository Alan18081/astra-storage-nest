import { IsInt } from 'class-validator';

export class RemoveProjectDto {

  @IsInt()
  id: number;

  @IsInt()
  userId: number;

}