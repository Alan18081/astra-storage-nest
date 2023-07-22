import {IStorageRecord} from 'astra-common';

export const mapStorageRecord = (record: IStorageRecord) => {
  return { id: record.id, ...record.data };
};
