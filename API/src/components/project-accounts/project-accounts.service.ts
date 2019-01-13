import {Injectable} from '@nestjs/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {createClientOptions} from '@astra/common/helpers';
import {CommunicationCodes, IProjectAccount, Queues} from '@astra/common';

@Injectable()
export class ProjectAccountsService {

    @Client(createClientOptions(Queues.PROJECTS_SERVICE))
    private readonly client: ClientProxy

    async findMany(projectId: number, userId: number): Promise<IProjectAccount[]> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNTS_LIST }, { projectId, userId })
            .toPromise();
    }

    async findOne(projectId: number, accountId: number, userId: number): Promise<IProjectAccount | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT }, { projectId, accountId, userId })
            .toPromise();
    }

    async removeOne(projectId: number, accountId: number, userId: number): Promise<void> {
        await this.client
            .send({ cmd: CommunicationCodes.REMOVE_PROJECT_ACCOUNT }, { projectId, accountId, userId })
            .toPromise();
    }

}