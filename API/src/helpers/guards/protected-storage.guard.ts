import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {createClientOptions} from '@astra/common/helpers';
import {CommunicationCodes, IStorage, Queues, StorageType} from '@astra/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {configService} from '../config.instance';

@Injectable()
export class ProtectedStorageGuard implements CanActivate {

    @Client(createClientOptions(Queues.PROJECTS_SERVICE))
    private readonly client: ClientProxy;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const { storageId } = req.params;
        const { projectAccount } = req;
        const storage: IStorage = await this.client
            .send({ cmd: CommunicationCodes.GET_STORAGE }, { storageId })
            .toPromise();

        return storage.typeId === StorageType.PROTECTED;
    }

}