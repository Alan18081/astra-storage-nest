import {Injectable, NotFoundException} from '@nestjs/common';
import {CommunicationCodes, IStorage, IStorageRecord, Messages, Queues} from '@astra/common';
import {createClientOptions} from '@astra/common/helpers';
import {Client, ClientProxy} from '@nestjs/microservices';

@Injectable()
export class StorageRecordsService {

    @Client(createClientOptions(Queues.PROJECTS_SERVICE))
    private readonly projectsClient: ClientProxy;

    @Client(createClientOptions(Queues.DATA_SERVICE))
    private readonly dataClient: ClientProxy;

    async findMany(storageId: number): Promise<IStorageRecord[]> {
        return this.dataClient
            .send({ cmd: CommunicationCodes.GET_STORAGE_RECORDS_LIST }, { storageId })
            .toPromise();
    }

    async createOne(storageId: number, userId: number, data: any): Promise<IStorageRecord> {
        const storage: IStorage = await this.projectsClient
            .send({ cmd: CommunicationCodes.GET_STORAGE }, { id: storageId  })
            .toPromise();

        if (!storage) {
            throw new NotFoundException(Messages.STORAGE_NOT_FOUND);
        }

        return this.dataClient
            .send({ cmd: CommunicationCodes.CREATE_STORAGE_RECORD }, {
                projectId: storage.id,
                storageId,
                userId,
                data,
            })
            .toPromise();
    }

    async updateOne(id: string, data: any): Promise<IStorageRecord | undefined> {
        return this.dataClient
            .send({ cmd: CommunicationCodes.UPDATE_STORAGE_RECORD }, { id, data })
            .toPromise();
    }

    async removeOne(id: string): Promise<void> {
        await this.dataClient
            .send({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORD }, { id })
            .toPromise();
    }

}