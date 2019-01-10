import { IsInt } from 'class-validator';

export class ChangeStorageTypeDto {

    @IsInt()
    storageId: number;

    @IsInt()
    typeId: number;
}