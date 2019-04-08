import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommunicationCodes } from '@astra/common/enums';
import { IStorageRecord } from '@astra/common/entities';
import { StorageRecordsGateway } from './storage-records.gateway';

@Controller()
export class StorageRecordsController {

  constructor(
    private readonly storageRecordsGateway: StorageRecordsGateway,
  ) {}

  @MessagePattern({ cmd: CommunicationCodes.SOCKET_CREATED_STORAGE_RECORD })
  handleCreate(payload: IStorageRecord): void {
    this.storageRecordsGateway.emitCreatedEvent(payload);
  }

  @MessagePattern({ cmd: CommunicationCodes.SOCKET_UPDATED_STORAGE_RECORD })
  handleUpdate(payload: IStorageRecord): void {
    this.storageRecordsGateway.emitUpdatedEvent(payload);
  }

  @MessagePattern({ cmd: CommunicationCodes.SOCKET_REMOVED_STORAGE_RECORD })
  handleRemove(payload: { id: number }): void {
      this.storageRecordsGateway.emitRemovedEvent(payload);
  }

}