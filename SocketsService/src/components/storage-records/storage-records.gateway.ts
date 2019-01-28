import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { IStorageRecord } from '@astra/common';
import { WsCodes } from '../../../../Common/src/enums/ws-codes.enum';

@WebSocketGateway()
export class StorageRecordsGateway {

  @WebSocketServer()
  private readonly server: any;

  emitCreatedEvent(payload: IStorageRecord) {
    this.server.emit(WsCodes.CREATED_STORAGE_RECORD, payload);
  }

  emitUpdatedEvent(payload: IStorageRecord) {
    this.server.emit(WsCodes.UPDATED_STORAGE_RECORD, payload);
  }

  emitRemovedEvent(id: string) {
    this.server.emit(WsCodes.REMOVED_STORAGE_RECORD, { id });
  }
}