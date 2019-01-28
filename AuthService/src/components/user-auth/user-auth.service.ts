import {Injectable} from '@nestjs/common';
import {ClientProxy, Client, RpcException} from '@nestjs/microservices';
import {
    CommunicationCodes,
    IUser,
    JWT_EXPIRES,
    JwtUserPayload,
    JwtUserResponse,
    Messages,
    Queues,
} from '@astra/common';
import { isString } from 'lodash';
import {HashService} from '@astra/common/services';
import {JwtService} from '@nestjs/jwt';
import {LoginDto} from '@astra/common/dto';
import {createClientOptions} from '@astra/common/helpers';
import {RefreshTokensService} from '../refresh-tokens/refresh-tokens.service';

@Injectable()
export class UserAuthService {

    @Client(createClientOptions(Queues.USERS_SERVICE))
    private readonly usersClient: ClientProxy;

    constructor(
       private readonly hashService: HashService,
       private readonly jwtService: JwtService,
       private readonly refreshTokensService: RefreshTokensService,
    ) {}

    async login(dto: LoginDto): Promise<JwtUserResponse> {
        const user: IUser = await this.usersClient.send({ cmd: CommunicationCodes.GET_USER_BY_EMAIL }, { email: dto.email })
            .toPromise();

        if (!user) {
            throw new RpcException(Messages.USER_NOT_FOUND);
        }

        if (!( await this.hashService.compareHash(dto.password, user.password))) {
            throw new RpcException(Messages.WRONG_PASSWORD);
        }

        const accessToken = this.jwtService.sign({ id: user.id, email: user.email });
        const refreshToken = await this.refreshTokensService.createOne({ accessToken, userId: user.id });

        return {
            accessToken,
            refreshToken: refreshToken.token,
            expiresIn: JWT_EXPIRES,
        };
    }

    async exchangeToken(refreshToken: string): Promise<JwtUserResponse> {

        const refreshTokenRecord = await this.refreshTokensService.findOneByToken(refreshToken);

        if (!refreshTokenRecord) {
            throw new RpcException(Messages.INVALID_REFRESH_TOKEN);
        }

        const user = await this.usersClient
            .send({cmd: CommunicationCodes.GET_USER}, {id: refreshTokenRecord.userId})
            .toPromise();

        if (!user) {
            throw new RpcException(Messages.USER_NOT_FOUND);
        }

        const accessToken = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            accessToken,
            refreshToken,
            expiresIn: JWT_EXPIRES,
        };
    }


}
