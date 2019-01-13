import {Injectable, NotFoundException} from '@nestjs/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {createClientOptions} from '@astra/common/helpers';
import {CommunicationCodes, IStorageRecord, Messages, Queues} from '@astra/common';

@Injectable()
export class PublicUserStoragesService {

    @Client(createClientOptions(Queues.PROJECTS_SERVICE))
    private readonly projectsClient: ClientProxy;

    @Client(createClientOptions(Queues.DATA_SERVICE))
    private readonly dataClient: ClientProxy;

    async findMany(storageId: number): Promise<IStorageRecord[]> {
        return this.dataClient
            .send({ cmd: CommunicationCodes.GET_STORAGE_RECORDS_LIST }, { storageId })
            .toPromise();
    }

    async findOne(id: string): Promise<IStorageRecord | undefined> {
        return this.dataClient
            .send({ cmd: CommunicationCodes.GET_STORAGE }, { id })
            .toPromise();
    }

    async createOne(projectId: number, storageId: number, data: any): Promise<IStorageRecord> {
        const storage: IStorageRecord = await this.projectsClient
            .send({ cmd: CommunicationCodes.GET_STORAGE }, { storageId })
            .toPromise();


        if (!storage) {
            throw new NotFoundException(Messages.STORAGE_NOT_FOUND);
        }

        return this.dataClient
            .send({ cmd: CommunicationCodes.CREATE_STORAGE_RECORD }, { projectId, storageId, data })
            .toPromise();
    }

    async updateOne(id: string, data: any): Promise<IStorageRecord> {
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