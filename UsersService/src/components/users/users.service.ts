import {Injectable} from '@nestjs/common';
import {CommunicationCodes, HashTypes, Messages, Queues} from '@astra/common';
import {User} from './user.entity';
import {UsersRepository} from './users.repository';
import {HashService} from '@astra/common/services';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateUserDto } from '@astra/common/dto';
import {ClientProxy, RpcException, Client} from '@nestjs/microservices';
import {UserHashesService} from '../user-hashes/user-hashes.service';
import {createClientOptions} from '@astra/common/helpers';

@Injectable()
export class UsersService {

    @Client(createClientOptions(Queues.EMAILS_SERVICE))
    private readonly emailsClient: ClientProxy;

    constructor(
       @InjectRepository(UsersRepository)
       private readonly usersRepository: UsersRepository,
       private readonly hashService: HashService,
       private readonly userHashesService: UserHashesService,
    ) {}

    async findMany(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async findById(id: number): Promise<User | undefined> {
        return this.usersRepository.findById(id);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOneByEmail(email);
    }

    async updateOne(id: number, data: Partial<User>): Promise<User | undefined> {
        return this.usersRepository.updateOne(id, data);
    }

    async createOne(userData: CreateUserDto): Promise<User> {
        if (await this.usersRepository.findOneByEmail(userData.email)) {
            throw new RpcException(Messages.USER_ALREADY_EXISTS);
        }

        const newUser = new User(userData);
        newUser.password = await this.hashService.generateHash(userData.password);
        return await this.usersRepository.save(newUser);
    }

    async removeById(id: number): Promise<void> {
        await this.usersRepository.removeOne(id);
    }

    async resetPassword(email: string): Promise<void> {
        const user = await this.usersRepository.findOneByEmail(email);

        if (!user) {
            throw new RpcException(Messages.USER_NOT_FOUND);
        }

        const userHash = await this.userHashesService.createOne(user.id, HashTypes.RESET_PASSWORD);

        await this.emailsClient
            .send({ cmd: CommunicationCodes.SEND_RESET_PASSWORD_EMAIL },  {
               firstName: user.firstName,
               lastName: user.lastName,
               email: user.email,
               hash: userHash.hash,
            })
            .toPromise();
    }

}