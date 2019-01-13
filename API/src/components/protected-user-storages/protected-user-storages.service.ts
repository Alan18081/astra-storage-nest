import {Injectable} from '@nestjs/common';
import {createClientOptions} from '@astra/common/helpers';
import {Client, ClientProxy} from '@nestjs/microservices';
import {
    CommunicationCodes,
    IStorageRecord,
    Queues,
} from '@astra/common';

@Injectable()
export class ProtectedUserStoragesService {

    @Client(createClientOptions(Queues.DATA_SERVICE))
    private readonly client: ClientProxy;

    async findMany(storageId: number, accountId: number): Promise<IStorageRecord[]> {
        return this.client
            .send(
                { cmd: CommunicationCodes.GET_STORAGE_RECORDS_LIST },
                { storageId,  accountId },
            ).toPromise();

    }

    async findOne(storageId: number, recordId: string, accountId: number): Promise<IStorageRecord | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_STORAGE_RECORD }, { recordId, accountId })
            .toPromise();
    }

    async createOne(storageId: number, data: any, accountId: number): Promise<IStorageRecord> {
        return this.client
            .send({ cmd: CommunicationCodes.CREATE_STORAGE_RECORD }, { storageId, data, accountId })
            .toPromise();
    }

    async updateOne(storageId: number,  id: string, data: any, accountId: number): Promise<IStorageRecord> {
        return this.client
            .send({ cmd: CommunicationCodes.UPDATE_STORAGE_RECORD }, { id, storageId, data, accountId })
            .toPromise();
    }

    async removeOne(storageId: number, data: any, accountId: number): Promise<IStorageRecord> {
        return this.client
            .send({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORD }, { storageId, data, accountId })
            .toPromise();
    }
}