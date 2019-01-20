import {Injectable} from '@nestjs/common';
import {Client, ClientProxy} from '@nestjs/microservices';
import {
    CommunicationCodes,
    IUser,
    Queues,
} from '@astra/common';
import {
    CreateUserByGoogleDto,
    CreateUserDto,
    FindUserDto,
    FindUsersListDto,
    RemoveUserDto,
    UpdateUserDto
} from '@astra/common/dto';
import {createClientOptions} from '@astra/common/helpers';

@Injectable()
export class UsersService {

    @Client(createClientOptions(Queues.USERS_SERVICE))
    private readonly client: ClientProxy;

    findMany(dto: FindUsersListDto): Promise<IUser[]> {
       return this.client
           .send({ cmd: CommunicationCodes.GET_USERS_LIST }, dto)
           .toPromise();
    }

    findOne(dto: FindUserDto): Promise<IUser | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_USER }, dto)
            .toPromise();
    }

    findOneByGoogleId(googleId: string): Promise<IUser | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.GET_USER_BY_GOOGLE_ID }, { googleId })
            .toPromise();
    }

    createOne(dto: CreateUserDto): Promise<IUser> {
        return this.client
            .send({ cmd: CommunicationCodes.CREATE_USER }, dto)
            .toPromise();
    }

    createOneByGoogle(dto: CreateUserByGoogleDto): Promise<IUser> {
        return this.client
            .send({ cmd: CommunicationCodes.CREATE_USER_BY_GOOGLE }, dto)
            .toPromise();
    }

    updateOne(dto: UpdateUserDto): Promise<IUser | undefined> {
        return this.client
            .send({ cmd: CommunicationCodes.UPDATE_USER }, dto)
            .toPromise();
    }

    removeOne(dto: RemoveUserDto): Promise<void> {
        return this.client
            .send({ cmd: CommunicationCodes.CREATE_USER }, dto)
            .toPromise();
    }

}