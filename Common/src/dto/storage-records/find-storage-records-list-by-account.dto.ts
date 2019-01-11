import { IsInt } from 'class-validator';

export class FindStorageRecordsListByAccountDto {

    @IsInt()
    accountId: number;

    @IsInt()
    storageId: number;

}