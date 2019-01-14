import {Injectable} from '@nestjs/common';
import {ClientProxy, Client, RpcException} from '@nestjs/microservices';
import {CommunicationCodes, IUser, JWT_EXPIRES, JwtResponse, Messages, Queues} from '@astra/common';
import {HashService} from '@astra/common/services';
import {JwtService} from '@nestjs/jwt';
import {LoginDto} from '@astra/common/dto';
import {createClientOptions} from '@astra/common/helpers';

@Injectable()
export class UserAuthService {

    @Client(createClientOptions(Queues.USERS_SERVICE))
    private readonly client: ClientProxy;

    constructor(
       private readonly hashService: HashService,
       private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginDto): Promise<JwtResponse> {
        const user: IUser = await this.client.send({ cmd: CommunicationCodes.GET_USER_BY_EMAIL }, { email: dto.email })
            .toPromise();

        if (!user) {
            throw new RpcException(Messages.USER_NOT_FOUND);
        }

        if (!( await this.hashService.compareHash(dto.password, user.password))) {
            throw new RpcException(Messages.WRONG_PASSWORD);
        }

        const accessToken = this.jwtService.sign({ id: user.id, email: user.email });
        const refreshToken = await this.client
            .send({ cmd: CommunicationCodes.CREATE_REFRESH_TOKEN }, { userId: user.id, accessToken })
            .toPromise();

        return {
            accessToken,
            refreshToken: refreshToken.token,
            expiresIn: JWT_EXPIRES,
        };
    }
}