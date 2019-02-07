import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../common';

export class FindStorageRecordsListForOwnerDto extends PaginationDto {

    @IsInt()
    projectId: number;

    @IsString()
    path: string;

}
