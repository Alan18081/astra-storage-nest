import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import {IStorageRecord} from '@bit/alan18081.astra-storage.common.dist/entities';
import {Exclude, Transform} from 'class-transformer';

@Entity()
export class StorageRecord implements IStorageRecord {

    @ObjectIdColumn()
    @Transform(value => value.toString())
    id: ObjectID;

    @Column()
    @Exclude()
    storageId: number;

    @Column()
    @Exclude()
    projectId: number;

    @Column()
    path: string;

    @Column()
    @Exclude()
    accountId?: number;

    @Column()
    data: any;

    constructor(data: Partial<StorageRecord>) {
        Object.assign(this, data);
    }
}