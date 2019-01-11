import { IStorageRecord } from '@astra/common';
import { Document } from 'mongoose';

export type StorageRecordModel =  IStorageRecord & Document;