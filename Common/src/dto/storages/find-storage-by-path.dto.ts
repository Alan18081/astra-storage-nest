import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class FindStorageByPathDto {

  @IsString()
  path: string;

  @IsBoolean()
  @IsOptional()
  includeData?: boolean;

}