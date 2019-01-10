import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class ChangeStorageTypeDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsInt()
    typeId: number;
}