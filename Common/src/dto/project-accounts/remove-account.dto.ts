import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class RemoveAccountDto extends BaseDto {

    @IsInt()
    accountId: number;

}