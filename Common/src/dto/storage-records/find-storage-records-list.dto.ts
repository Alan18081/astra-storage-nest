import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../common';

export class FindStorageRecordsListDto extends PaginationDto {

    @IsInt()
    projectId: number;

    @IsString()
    path: string;

}