import {Injectable, NotFoundException} from '@nestjs/common';
import {CommunicationCodes, IStorage, IStorageRecord, Messages, Queues} from '@astra/common';
import {createClientOptions} from '@astra/common/helpers';
import {Client, ClientProxy} from '@nestjs/microservices';
import {StoragesService} from '../storages/storages.service';

@Injectable()
export class StorageRecordsService {

    @Client(createClientOptions(Queues.DATA_SERVICE))
    private readonly client: ClientProxy;

    constructor(
       private readonly storagesService: StoragesService,
    ) {}

    async findMany(storageId: number): Promise<IStorageRecord[]> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_STORAGE_RECORDS_LIST }, { storageId })
            .toPromise();
    }

    async createOne(storageId: number, userId: number, data: any): Promise<IStorageRecord> {
        const storage: IStorage = await this.storagesService.findOne(storageId, userId);

        if (!storage) {
            throw new NotFoundException(Messages.STORAGE_NOT_FOUND);
        }

        return this.client
            .send({ cmd: CommunicationCodes.CREATE_STORAGE_RECORD }, {
                projectId: storage.projectId,
                storageId: storage.id,
                userId,
                data,
            })
            .toPromise();
    }

    async updateOne(id: string, data: any): Promise<IStorageRecord | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.UPDATE_STORAGE_RECORD }, { id, data })
            .toPromise();
    }

    async removeOne(id: string): Promise<void> {
        await this.client
            .send({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORD }, { id })
            .toPromise();
    }

}