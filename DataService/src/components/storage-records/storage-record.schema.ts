import { Schema } from 'mongoose';
import { IStorageRecord } from '@astra/common';

export const StorageRecordSchema = new Schema({
   storageId: Number,
   projectId: Number,
   path: String,
   accountId: Number,
   data: Object,
});