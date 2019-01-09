import { StorageType } from '../enums/storage-type.enum';
export interface IStorage {
    id: number;
    name: string;
    description: string;
    path: string;
    projectId: number;
    dataId?: string;
    data?: object;
    typeId: StorageType;
}
