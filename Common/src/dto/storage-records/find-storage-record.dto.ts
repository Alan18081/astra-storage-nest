import { IsMongoId } from 'class-validator';

export class FindStorageRecordDto {

  @IsMongoId()
  id: string;

}