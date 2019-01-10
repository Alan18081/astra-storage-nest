import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindAccountDto extends BaseDto {

    @IsInt()
    id: number;

}