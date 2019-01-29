import {IStorageRecord} from '@astra/common/entities';

export const mapStorageRecord = (record: IStorageRecord) => {
  return { id: record.id, ...record.data };
};
