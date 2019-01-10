import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateStorageDto {

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