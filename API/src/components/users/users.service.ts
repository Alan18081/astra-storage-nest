import {Injectable} from '@nestjs/common';
import {Client, Transport, ClientProxy} from '@nestjs/microservices';

@Injectable()
export class UsersService {

    @Client({ transport: Transport.RMQ })
    private readonly client: ClientProxy;

    private create(dto: )
}