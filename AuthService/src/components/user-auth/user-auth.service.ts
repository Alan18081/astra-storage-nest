import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy, Client} from '@nestjs/microservices';
import {CommunicationCodes, IUser, JWT_EXPIRES, JwtResponse, LoginDto, Messages} from '@astra/common';
import {HashService} from '@astra/common/services';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserAuthService {

    @Client()
    private readonly client: ClientProxy;

    constructor(
       private readonly hashService: HashService,
       private readonly jwtService: JwtService
    ) {}

    async login(dto: LoginDto): Promise<JwtResponse> {
        const user: IUser = await this.client.send({ cmd: CommunicationCodes.GET_USER_BY_EMAIL }, { email: dto.email })
            .toPromise();

        if(!user) {
            throw new NotFoundException(Messages.USER_NOT_FOUND);
        }

        if(!this.hashService.compareHash(dto.password, user.password)) {
            throw new BadRequestException(Messages.WRONG_PASSWORD);
        }

        const accessToken = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            accessToken,
            refreshToken: '',
            expiresIn: JWT_EXPIRES,
        }
    }
}