import {Injectable} from '@nestjs/common';
import {CommunicationCodes, HashTypes, Messages, Queues} from '@astra/common';
import {User} from './user.entity';
import {UsersRepository} from './users.repository';
import {HashService} from '@astra/common/services';
import {InjectRepository} from '@nestjs/typeorm';
import { ChangePasswordDto, CreateUserByGoogleDto, CreateUserDto, SetNewPasswordDto } from '@astra/common/dto';
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

    async findOneByGoogleId(googleId: string): Promise<User | undefined> {
        return this.usersRepository.findOneByGoogleId(googleId);
    }

    async updateOne(id: number, data: Partial<User>): Promise<User | undefined> {
        return this.usersRepository.updateOneAndFind(id, data);
    }

    async createOne(dto: CreateUserDto): Promise<User> {
        if (await this.usersRepository.findOneByEmail(dto.email)) {
            throw new RpcException(Messages.USER_ALREADY_EXISTS);
        }

        const newUser = new User(dto);
        newUser.password = await this.hashService.generateHash(dto.password);
        return this.usersRepository.save(newUser);
    }

    async createOneByGoogle(dto: CreateUserByGoogleDto): Promise<User> {
        if (await this.usersRepository.findOneByEmail(dto.email)) {
            throw new RpcException(Messages.USER_ALREADY_EXISTS);
        }

        const newUser = new User(dto);
        return this.usersRepository.save(newUser);
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

    async setNewPassword({ hash, password }: SetNewPasswordDto): Promise<void> {
        const userHash = await this.userHashesService.findOneByHash(hash);

        if (!userHash) {
           throw new RpcException(Messages.INVALID_PASSWORD_HASH);
        }

        const passwordHash = await this.hashService.generateHash(password);
        await this.updateOne(userHash.userId, { password: passwordHash });
    }

    async changePassword({ id, oldPassword, newPassword }: ChangePasswordDto): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new RpcException(Messages.USER_NOT_FOUND);
        }

        if (!user.password) {
            throw new RpcException(Messages.USER_DOESNT_HAVE_PASSWORD);
        }

        const isValid = await this.hashService.compareHash(oldPassword, user.password);

        if (!isValid) {
            throw new RpcException(Messages.WRONG_PASSWORD);
        }

        const newPasswordHash = await this.hashService.generateHash(newPassword);

        await this.usersRepository.updateOne(id,{ password: newPasswordHash });
    }

}