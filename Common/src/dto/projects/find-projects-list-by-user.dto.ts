import {IsInt} from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindProjectsListByUserDto extends BaseDto {

    @IsInt()
    userId: number;

}