import {Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import { Client } from '@nestjs/microservices';
import {createClientOptions} from 'astra-common';
import {CommunicationCodes, IProject, Queues} from 'astra-common';
import {CreateProjectDto, UpdateProjectDto} from 'astra-common';

@Injectable()
export class ProjectsService {

    @Client(createClientOptions(Queues.PROJECTS_SERVICE, process.env.RABBIT_URL))
    private readonly client: ClientProxy;

    async findAll(): Promise<IProject[]> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_PROJECTS_LIST }, {})
            .toPromise();
    }

    async findManyByUser(userId: number): Promise<IProject[]> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_PROJECTS_LIST_BY_USER }, { userId })
            .toPromise();
    }

    async findOne(id: number, userId: number): Promise<IProject | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_PROJECT }, { id, userId })
            .toPromise();
    }

    async findOneByClientInfo(clientId: string, clientSecret: string): Promise<IProject | undefined> {
        return this.client
          .send({ cmd: CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO }, {  clientId, clientSecret })
          .toPromise();
    }

    async createOne(userId: number, dto: CreateProjectDto): Promise<IProject | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.CREATE_PROJECT }, { userId, ...dto })
            .toPromise();
    }

    async updateOne(id: number, userId: number, dto: UpdateProjectDto): Promise<IProject | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.UPDATE_PROJECT }, { id, userId, ...dto })
            .toPromise();
    }

    async removeOne(id: number, userId: number): Promise<void> {
        await this.client
            .send({ cmd: CommunicationCodes.REMOVE_PROJECT }, { id, userId })
            .toPromise();
    }
}
