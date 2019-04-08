import { Action } from '@bit/alan18081.astra-storage.common.dist/interfaces';
import { DataActions } from '@bit/alan18081.astra-storage.common.dist/enums';
import { IStorageRecord } from '@bit/alan18081.astra-storage.common.dist/entities';

export class CreatedStorageRecordAction implements Action {
  readonly type = DataActions.CREATED_STORAGE_RECORD;
  constructor(
    public payload: IStorageRecord,
  ) {}
}

export class UpdatedStorageRecordAction implements Action {
  readonly type = DataActions.UPDATED_STORAGE_RECORD;
  constructor(
    public payload: IStorageRecord,
  ) {}
}

export class RemovedStorageRecordAction implements Action {
  readonly type = DataActions.REMOVED_STORAGE_RECORD;
  constructor(
    public payload: { id: string },
  ) {}
}