import { IsInt, IsDefined, IsString, IsOptional } from 'class-validator';

export class CreateStorageRecordDto {

    @IsInt()
    projectId: number;

    @IsInt()
    storageId: number;

    @IsString()
    path: string;

    @IsDefined()
    data: any;

    @IsInt()
    @IsOptional()
    accountId?: number;

}