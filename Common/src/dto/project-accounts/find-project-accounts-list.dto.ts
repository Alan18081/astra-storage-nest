import { IsInt } from 'class-validator';
import { PaginationDto } from '../common';

export class FindProjectAccountsListDto extends PaginationDto  {

  @IsInt()
  userId: number;

  @IsInt()
  projectId: number;

}