import { IsInt } from 'class-validator';
import { PaginationDto } from '../common/pagination.dto';

export class FindStoragesListDto extends PaginationDto {

  @IsInt()
  userId: number;

  @IsInt()
  projectId: number;

}