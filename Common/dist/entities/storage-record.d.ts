export interface IStorageRecord {
    _id: string;
    storageId: number;
    projectId: number;
    path: string;
    accountId: number;
    data: object;
}
