import {Injectable} from '@nestjs/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {createClientOptions} from '@astra/common/helpers';
import {CommunicationCodes, IStorage, Queues} from '@astra/common';

@Injectable()
export class StoragesService {

    @Client(createClientOptions(Queues.PROJECTS_SERVICE))
    private readonly projectsClient: ClientProxy;

    @Client(createClientOptions(Queues.DATA_SERVICE))
    private readonly dataClient: ClientProxy;

    async findManyByProject(query: any): Promise<IStorage[]> {
        return this.projectsClient
            .send({ cmd: CommunicationCodes.GET_STORAGES_LIST }, query)
            .toPromise();
    }

    async findOne(id: number, userId: number, includeData: boolean = false): Promise<IStorage | undefined> {
        return this.projectsClient
            .send({ cmd: CommunicationCodes.GET_STORAGE }, { id, userId, includeData })
            .toPromise();
    }

    async createOne(userId: number, data: any): Promise<IStorage | undefined> {
        return this.projectsClient
            .send({ cmd: CommunicationCodes.CREATE_STORAGE }, { userId, ...data })
            .toPromise();
    }

    async updateOne(id: number, userId: number, data: any): Promise<IStorage | undefined> {
        return this.projectsClient
            .send({ cmd: CommunicationCodes.UPDATE_STORAGE }, { id, userId, ...data })
            .toPromise();
    }

    async removeOne(id: number, userId: number): Promise<void> {
        await Promise.all([
           this.projectsClient
               .send({ cmd: CommunicationCodes.REMOVE_STORAGE }, { id, userId })
               .toPromise(),
           this.dataClient
               .send({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORDS_LIST }, { storageId: id, userId })
               .toPromise(),
        ]);
    }

}