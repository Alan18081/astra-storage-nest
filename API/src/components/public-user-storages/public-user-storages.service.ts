import {Injectable, NotFoundException} from '@nestjs/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {createClientOptions} from '@astra/common/helpers';
import {CommunicationCodes, IStorage, IStorageRecord, Messages, Queues} from '@astra/common';
import {StoragesService} from '../storages/storages.service';

@Injectable()
export class PublicUserStoragesService {

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

    async findOne(id: string): Promise<IStorageRecord | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_STORAGE_RECORD }, { id })
            .toPromise();
    }

    async createOne(path: string, projectId: number, data: any): Promise<IStorageRecord> {
        const storage: IStorage = await this.storagesService.findOneByPath(path, projectId);

        if (!storage) {
            throw new NotFoundException(Messages.STORAGE_NOT_FOUND);
        }

        return this.client
            .send({ cmd: CommunicationCodes.CREATE_STORAGE_RECORD }, { projectId, storageId: storage.id, data })
            .toPromise();
    }

    async updateOne(id: string, data: any): Promise<IStorageRecord> {
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