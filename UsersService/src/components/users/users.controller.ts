import {ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors} from '@nestjs/common';
import {BaseRpcExceptionFilter, MessagePattern} from '@nestjs/microservices';
import {
    CommunicationCodes,
    Messages,
    ServiceExceptionFilter,
} from '@astra/common';
import {
    CreateUserByGoogleDto,
    CreateUserDto,
    FindUserByEmailDto,
    FindUserDto,
    FindUsersListDto,
    RemoveUserDto, ResetPasswordDto, SetNewPasswordDto,
    UpdateUserDto,
} from '@astra/common/dto';
import {User} from './user.entity';
import {UsersService} from './users.service';
import {FindUserByGoogleIdDto} from '../../../../Common/src/dto/users/find-user-by-google-id.dto';

@Controller()
@UseFilters(ServiceExceptionFilter)
export class UsersController {

    constructor(
       private readonly usersService: UsersService,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_USERS_LIST })
    async findMany(dto: FindUsersListDto): Promise<User[]> {
        return this.usersService.findMany();
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER })
    async findOne(dto: FindUserDto): Promise<User | undefined> {
        return this.usersService.findById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER_BY_GOOGLE_ID })
    async findOneByGoogleId(dto: FindUserByGoogleIdDto): Promise<User | undefined> {
        return this.usersService.findOneByGoogleId(dto.googleId);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER_BY_EMAIL })
    async findOneByEmail(dto: FindUserByEmailDto): Promise<User | undefined> {
        return this.usersService.findOneByEmail(dto.email);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_USER })
    async createOne(dto: CreateUserDto): Promise<User> {
        return this.usersService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_USER_BY_GOOGLE })
    async createOneByGoogle(dto: CreateUserByGoogleDto): Promise<User> {
        return this.usersService.createOneByGoogle(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_USER })
    async updateOne(dto: UpdateUserDto): Promise<User | undefined> {
        return this.usersService.updateOne(dto.id, dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_USER} )
    async removeOne(dto: RemoveUserDto): Promise<void> {
        await this.usersService.removeById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.RESET_USER_PASSWORD })
    async resetPassword(dto: ResetPasswordDto): Promise<void> {
        return this.usersService.resetPassword(dto.email);
    }

    @MessagePattern({ cmd: CommunicationCodes.SET_NEW_PASSWORD })
    async setNewPassword(dto: SetNewPasswordDto): Promise<void> {
        return this.usersService.setNewPassword(dto);
    }

}