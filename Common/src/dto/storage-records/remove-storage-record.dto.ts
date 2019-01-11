import { IsMongoId } from 'class-validator';

export class RemoveStorageRecordDto {

    @IsMongoId()
    id: string;

}
