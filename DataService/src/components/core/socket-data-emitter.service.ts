import {Injectable} from '@nestjs/common';
import {IStorageRecord} from '@bit/alan18081.astra-storage.common.dist/entities';
import {Queues, CommunicationCodes} from '@bit/alan18081.astra-storage.common.dist/enums';
import {Client, ClientProxy} from '@nestjs/microservices';
import {createClientOptions} from '@bit/alan18081.astra-storage.common.dist/helpers';
import {SerializerService} from '@bit/alan18081.astra-storage.common.dist/services';
import {mapStorageRecord} from '../../helpers/utils/map-storage-record';

@Injectable()
export class SocketDataEmitterService {

    @Client(createClientOptions(Queues.SOCKETS_SERVICE))
    private readonly socketsClient: ClientProxy;

    constructor(
       private readonly serializerService: SerializerService,
    ) {}

    emitCreatedEvent(payload: IStorageRecord): void {
        const preparedRecord = mapStorageRecord(this.serializerService.exclude(payload));
        this.socketsClient.send({ cmd: CommunicationCodes.SOCKET_CREATED_STORAGE_RECORD }, preparedRecord).toPromise();
    }

    emitUpdatedEvent(payload: IStorageRecord): void {
        const preparedRecord = mapStorageRecord(this.serializerService.exclude(payload));
        this.socketsClient.send({ cmd: CommunicationCodes.SOCKET_UPDATED_STORAGE_RECORD }, preparedRecord).toPromise();
    }

    emitRemovedEvent(payload: string): void {
        this.socketsClient.send({ cmd: CommunicationCodes.SOCKET_REMOVED_STORAGE_RECORD }, { id: payload });
    }

}