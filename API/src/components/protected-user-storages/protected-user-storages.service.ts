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

    async findMany(path: string, accountId: number): Promise<IStorageRecord[]> {
        return this.client
            .send(
                { cmd: CommunicationCodes.SDK_GET_STORAGE_RECORDS_LIST },
                { path,  accountId },
            ).toPromise();
    }

    async findOne(id: string, accountId: number): Promise<IStorageRecord | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.SDK_GET_STORAGE_RECORD }, { id, accountId })
            .toPromise();
    }

    async createOne(path: string, data: any, accountId: number): Promise<IStorageRecord> {
        return this.client
            .send({ cmd: CommunicationCodes.SDK_CREATE_STORAGE_RECORD }, { path, data, accountId })
            .toPromise();
    }

    async updateOne(id: string, data: any, accountId: number): Promise<IStorageRecord> {
        return this.client
            .send({ cmd: CommunicationCodes.SDK_UPDATE_STORAGE_RECORD }, { id, data, accountId })
            .toPromise();
    }

    async removeOne(id: string, accountId: number): Promise<IStorageRecord> {
        return this.client
            .send({ cmd: CommunicationCodes.SDK_REMOVE_STORAGE_RECORD }, { id, accountId })
            .toPromise();
    }
}