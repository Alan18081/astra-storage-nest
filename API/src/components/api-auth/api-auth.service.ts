import {Injectable} from '@nestjs/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {CreateProjectAccountDto, LoginDto} from '@astra/common/dto';
import {CommunicationCodes, JwtResponse, Queues} from '@astra/common';
import {createClientOptions} from '@astra/common/helpers';

@Injectable()
export class ApiAuthService {

    @Client(createClientOptions(Queues.PROJECTS_SERVICE))
    private readonly client: ClientProxy;

    async createOne(projectId: number, dto: CreateProjectAccountDto): Promise<void> {
        await this.client.send({ cmd: CommunicationCodes.CREATE_PROJECT_ACCOUNT }, { ...dto, projectId }).toPromise();
    }

    async login(projectId: number, dto: LoginDto): Promise<JwtResponse> {
        return this.client.send({ cmd: CommunicationCodes.LOGIN_PROJECT_ACCOUNT }, { ...dto, projectId }).toPromise();
    }

}