import { IsInt } from 'class-validator';
import { PaginationDto } from '../common/pagination.dto';

export class FindStorageListDto extends PaginationDto {

  @IsInt()
  userId: number;

  @IsInt()
  projectId: number;

}