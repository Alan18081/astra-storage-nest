import {ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors} from '@nestjs/common';
import {BaseRpcExceptionFilter, MessagePattern} from '@nestjs/microservices';
import {
    CommunicationCodes,
    Messages,
} from '@astra/common';
import {
  CreateUserDto,
  FindUserByEmailDto,
  FindUserDto,
  FindUsersListDto,
  RemoveUserDto,
  UpdateUserDto,
} from '@astra/common/dto';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {ExceptionFilter} from '../../helpers/filters/custom.filter';

@Controller()
@UseFilters(ExceptionFilter)
export class UsersController {

    constructor(
       private readonly usersService: UsersService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_USERS_LIST })
    async findMany(dto: FindUsersListDto): Promise<User[]> {
        return await this.usersService.findMany();
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER })
    async findOne(dto: FindUserDto): Promise<User | undefined> {
        return await this.usersService.findById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER_BY_EMAIL })
    async findOneByEmail(dto: FindUserByEmailDto): Promise<User | undefined> {
        return await this.usersService.findOneByEmail(dto.email);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_USER })
    async createOne(dto: CreateUserDto): Promise<User> {
        return await this.usersService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_USER })
    async updateOne(dto: UpdateUserDto): Promise<User | undefined> {
        return await this.usersService.updateOne(dto.id, dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_USER} )
    async removeOne(dto: RemoveUserDto): Promise<void> {
        await this.usersService.removeById(dto.id);
    }

}