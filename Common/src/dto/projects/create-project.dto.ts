import {IsInt, IsOptional, IsString} from 'class-validator';
import {BaseDto} from '@astra/common';

export class CreateProjectDto extends BaseDto {

    @IsInt()
    userId: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

}