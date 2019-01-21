import {IsString, IsOptional, IsBoolean, IsNumber} from 'class-validator';

export class FindStorageByPathDto {

  @IsString()
  path: string;

  @IsNumber()
  projectId: number;

  @IsBoolean()
  @IsOptional()
  includeData?: boolean;

}