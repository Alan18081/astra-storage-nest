import { IsInt } from 'class-validator';

export class RemoveStorageRecordsListByStorageDto {

    @IsInt()
    storageId: number;

}
