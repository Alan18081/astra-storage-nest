import {Injectable} from '@nestjs/common';
import {Client, Transport, ClientProxy} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    CommunicationCodes,
    CreateUserDto,
    FindUserDto,
    FindUsersListDto,
    IUser,
    Queues,
    RABBIT_MQ_URL, RemoveUserDto, UpdateUserDto
} from '@astra/common';

@Injectable()
export class UsersService {

    @Client({ transport: Transport.RMQ, options: { queue: Queues.USERS_SERVICE, urls: [RABBIT_MQ_URL] } })
    private readonly client: ClientProxy;

    findMany(dto: FindUsersListDto): Observable<IUser[]> {
       return this.client.send(CommunicationCodes.GET_USERS_LIST, dto);
    }

    findOne(dto: FindUserDto): Observable<IUser | undefined> {
        return this.client.send(CommunicationCodes.GET_USER, dto);
    }

    createOne(dto: CreateUserDto): Observable<IUser> {
        return this.client.send(CommunicationCodes.CREATE_USER, dto);
    }

    updateOne(dto: UpdateUserDto): Observable<IUser | undefined> {
        return this.client.send(CommunicationCodes.CREATE_USER, dto);
    }

    removeOne(dto: RemoveUserDto): Observable<void> {
        return this.client.send(CommunicationCodes.CREATE_USER, dto);
    }

}