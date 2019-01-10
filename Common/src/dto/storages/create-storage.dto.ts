import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateStorageDto {

  @IsInt()
  projectId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  userId: number;

  @IsString()
  @MinLength(4)
  path: string;

}