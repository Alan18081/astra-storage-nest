import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Action} from 'astra-common';
import { WsCodes } from 'astra-common';
import { IStorageRecord } from 'astra-common';
import * as actions from './storage-records.actions';

@WebSocketGateway(5001, { namespace: '/' })
export class StorageRecordsGateway {

  @WebSocketServer()
  private readonly server: any;

  private emitDataEvent(payload: Action) {
    this.server.emit(WsCodes.DATA_CHANGED, payload);
  }

  emitCreatedEvent(payload: IStorageRecord) {
    this.emitDataEvent(new actions.CreatedStorageRecordAction(payload));
  }

  emitUpdatedEvent(payload: IStorageRecord) {
      this.emitDataEvent(new actions.UpdatedStorageRecordAction(payload));
  }

  emitRemovedEvent(id: number) {
      this.emitDataEvent(new actions.RemovedStorageRecordAction({ id: id.toString() }));
  }
}
