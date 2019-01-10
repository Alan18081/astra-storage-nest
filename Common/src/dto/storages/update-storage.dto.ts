import { IsString, IsOptional, IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class UpdateStorageDto extends BaseDto {

    @IsInt()
    id: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    path?: string;

}