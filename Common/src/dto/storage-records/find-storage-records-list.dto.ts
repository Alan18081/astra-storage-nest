import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../common';

export class FindStorageRecordsListDto extends PaginationDto {

    @IsInt()
    storageId: number;

    @IsString()
    path: number;

}