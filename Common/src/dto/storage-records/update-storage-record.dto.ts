import { IsDefined, IsMongoId } from 'class-validator';

export class UpdateStorageRecordDto {

    @IsMongoId()
    id: string;

    @IsDefined()
    data: any;

}
