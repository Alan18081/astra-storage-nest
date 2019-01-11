import { IStorageRecord } from '@astra/common';
import { Document } from 'mongoose';

export type StorageRecord =  IStorageRecord & Document;