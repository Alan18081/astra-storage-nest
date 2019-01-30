import { Action } from '@astra/common/interfaces';
import { DataActions } from '@astra/common/enums';
import { IStorageRecord } from '@astra/common/entities';

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