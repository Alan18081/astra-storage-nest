import { Schema } from 'mongoose';

export const StorageRecordSchema = new Schema({
   storageId: Number,
   projectId: Number,
   path: String,
   accountId: Number,
   data: Object,
});