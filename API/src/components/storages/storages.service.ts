import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {createClientOptions} from '@astra/common/helpers';
import { CommunicationCodes, IStorage, Messages, Queues, StorageType } from '@astra/common';
import {configService} from '../../helpers/config.instance';

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

    async findOneByPath(path: string, projectId: number): Promise<IStorage | undefined> {
        return this.projectsClient
            .send({ cmd: CommunicationCodes.GET_STORAGE_BY_PATH }, { path, projectId })
            .toPromise();
    }

    async checkIfStorageExists(path: string, typeId: StorageType, projectId: number): Promise<void> {
        const foundStorage = await this.findOneByPath(path, projectId);
        if (!foundStorage) {
            throw new NotFoundException(Messages.STORAGE_NOT_FOUND);
        }

        if (foundStorage.typeId !== typeId) {
            throw new BadRequestException(Messages.INVALID_STORAGE_TYPE);
        }
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
               .send({ cmd: CommunicationCodes.REMOVE_STORAGE_RECORDS_LIST_BY_STORAGE }, { storageId: id })
               .toPromise(),
        ]);
    }

}
