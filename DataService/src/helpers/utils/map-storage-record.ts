import {IStorageRecord} from '@bit/alan18081.astra-storage.common.dist/entities';

export const mapStorageRecord = (record: IStorageRecord) => {
  return { id: record.id, ...record.data };
};
