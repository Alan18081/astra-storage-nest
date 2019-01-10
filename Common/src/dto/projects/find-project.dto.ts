import {IsInt} from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindProjectDto extends BaseDto {

    @IsInt()
    id: number;

}