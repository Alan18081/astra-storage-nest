import {IsInt} from 'class-validator';
import { PaginationDto } from '@astra/common';

export class ValidateProjectDto extends PaginationDto {

    @IsInt()
    userId: number;

    @IsInt()
    projectId: number;

}